import { Request, Response ,NextFunction, Router} from 'express';
import { Qcm, SolutionObject, QcmResultsObject, QcmGlobalResultsObject, QcmResults, QcmGlobalResults, ResponseChoices, Solution } from '../model/qcm';
//import { ErrorWithStatus , NotFoundError, ConflictError } from '../error/errorWithStatus';
import { asyncToResp} from './apiHandler';
import { qcmService , qcmResultsService } from '../core/services';
import { PostChoicesRequest, PostChoicesResponse } from './dto/postChoicesData';
import { mySmtpUtil } from '../util/smtp-util';

export const qcmApiRouter = Router();

// .../qcm-api/private/role_admin/qcm/1 ou ... (private version : return qcm with solutions)
qcmApiRouter.route('/qcm-api/private/role_admin/qcm/:id')
.get(asyncToResp(async function(req :Request, res :Response , next: NextFunction){
    let idQcm = req.params.id;
    let qcm = await qcmService().findById(idQcm)
    return qcm;
}));

// version public : comme version privée mais retournant qcm avec questions seulement (pas les réponses)
qcmApiRouter.route('/qcm-api/public/qcm/:id')
.get(asyncToResp(async function(req :Request, res :Response , next: NextFunction){
    let idQcm = req.params.id;
    let qcm = await qcmService().findById(idQcm)
    qcm.solutions=null; //pour eviter triche via observation directe des req http
    return qcm;
}));

// private version : return qcm with all details (solutions )
// http://localhost:8282/qcm-api/public/qcm renvoyant tout [ {} , {}]
// http://localhost:8282/qcm-api/public/qcm?xyz=abc renvoyant [{}] selon critere
qcmApiRouter.route('/qcm-api/private/role_admin/qcm')
.get(asyncToResp(async function(req :Request, res :Response , next: NextFunction ) {
    //let  xyz = req.query.xyz;
    let qcmArray = await qcmService().findAll();
    /*if(xyz){
            //filtrage selon critère xyz:
        }*/
    return qcmArray;
}));

//version public comme version privée mais retournant [] de Qcm sans details
//et avec filtrages : ?mode=training or ?mode=eval
// ?org=orgXyz ?session_code=codeXyz
qcmApiRouter.route('/qcm-api/public/qcm')
.get(asyncToResp(async function(req :Request, res :Response , next: NextFunction ) {
    let  mode = req.query.mode; //may be null/undefined
    let  org = req.query.org; //may be null/undefined
    let  session_code = req.query.session_code; //may be null/undefined
    let qcmArray = await qcmService().findAll();
    let filteredQcmArray : Qcm[] = [];
    for(let qcm of qcmArray){
        qcm.questions=null;
        qcm.solutions=null;
        if( (mode == null && qcm.purpose != 'eval') || 
            (mode != null && mode ==  qcm.purpose)){
            filteredQcmArray.push(qcm);
        }
        //futurs autres filtrages
    }
    return filteredQcmArray;
}));

var tabResNumFromIndex : string[] = [ 'a' , 'b' , 'c' , 'd' , 'e' , 'f' ,'g' , 'h'];


function ajustSolutionsInQcm(qcm : Qcm): void{
    qcm.solutions=[];
    for(let i=0;i<qcm.nbQuestions;i++){
        qcm.solutions[i]=new SolutionObject(qcm.questions[i].num,[]);
        for(let j=0;j<qcm.questions[i].answers.length;j++){
            if(qcm.questions[i].answers[j].ok!=null){
               if(qcm.questions[i].answers[j].ok==true){
                  qcm.solutions[i].goodAnswerNums.push(tabResNumFromIndex[j]) ;
               }
               Reflect.deleteProperty(qcm.questions[i].answers[j] as any as object,"ok");
            }
        }
    }
}

//POST ... with body { .... }
qcmApiRouter.route('/qcm-api/private/role_admin/qcm')
.post(asyncToResp(async function(req :Request, res :Response , next: NextFunction ) {
    let  qcm :Qcm =  req.body ; //as javascript object via jsonParser
    ajustSolutionsInQcm(qcm);
    let savedQcm = await qcmService().insert(qcm);
                      // await qcmService.saveOrUpdate(Qcm);
    return savedQcm;
}));


function htmlTextForQcmResult(qcmResults :QcmResultsObject):string {
    var htmlTexte="<h2>resultats du qcm</h2>"
    + "<p> organisation = "+  qcmResults.performer.org +"</p>"
    + "<p> nom = <b>"+  qcmResults.performer.fullName +"</b></p>"
    + "<p> nb bonnes réponses = <b>"+  qcmResults.globalResults.nbGoodResponses +"</b></p>"
    + "<p> score = <b>"+  qcmResults.globalResults.percentageScore +" %</b></p>"
    + "<p> détails = <i>"+  JSON.stringify(qcmResults.choices) +"</i></p>"
    return htmlTexte;
}

//POST qcm_choices to get results
qcmApiRouter.route('/qcm-api/public/qcm_choices')
.post(asyncToResp(async function(req :Request, res :Response , next: NextFunction ) {
    let  postChoicesRequest :PostChoicesRequest = req.body ; //as javascript object via jsonParser
    let qcmGlobalResult = null;
    let email:string = postChoicesRequest.qcmPerformer.email;
    postChoicesRequest.qcmPerformer.email="not registered (confidential)";
    //load qcm with solutions:
    let qcm = await qcmService().findById(postChoicesRequest.qcmId);
    //building globalresults:
    qcmGlobalResult = buildResults(qcm,postChoicesRequest.choices);
    //storing results only if mode=eval:
    let qcmResults = new QcmResultsObject(null,
                                          postChoicesRequest.qcmPerformer,
                                          postChoicesRequest.qcmId,
                                          postChoicesRequest.choices,
                                          qcmGlobalResult);
    let savedQcmResults : QcmResults =qcmResults;
    if(postChoicesRequest.mode=='eval'){
        savedQcmResults = await qcmResultsService().insert(qcmResults);
        if(email!=null && mySmtpUtil.isInitialized()){
            mySmtpUtil.sendSimpleEmail(email,
                                      "qcm results",
                                      htmlTextForQcmResult(savedQcmResults),true);
        }
        
    }
    //returning results & solutions:
    let  postChoicesResponse : PostChoicesResponse = new PostChoicesResponse();
    postChoicesResponse.globalResults=savedQcmResults.globalResults;
    postChoicesResponse.qcmResultsId=savedQcmResults._id;
    qcm.choices=postChoicesRequest.choices;
    postChoicesResponse.qcm=qcm;//with details/solutions and copy of choices
    return postChoicesResponse;
}));

//PUT ... with body { .... }
qcmApiRouter.route('/qcm-api/private/role_admin/qcm')
.put(asyncToResp(async  function(req :Request, res :Response , next: NextFunction ) {
    let  qcm :Qcm =  req.body ; //as javascript object
    ajustSolutionsInQcm(qcm);
    let updatedQcm = await qcmService().update(qcm);
    return updatedQcm;
}));

// DELETE http://localhost:8282/qcm-api/private/role_admin/qcm/1
qcmApiRouter.route('/qcm-api/private/role_admin/qcm/:id')
.delete(asyncToResp(async  function(req :Request, res :Response , next: NextFunction ) {
    let idQcm = req.params.id;
    await qcmService().deleteById(idQcm)
    return{ "action" : "qcm with id="+idQcm + " was deleted"};
}));


function buildResults(qcm:Qcm, choices: ResponseChoices[]):QcmGlobalResults{
    let qcmResults = new QcmGlobalResultsObject();
    qcmResults.nbGoodResponses=0;
    for(let index in qcm.questions){
       let  respChoices : ResponseChoices = choices[index];
       let  solutionsQuestion : Solution = qcm.solutions[index];
       if(respChoices.num!=solutionsQuestion.num){
           throw "index exception in buildResults()";
       }else{
           let ok : boolean = true ; //by default (before verif)
           for(let goodResp of solutionsQuestion.goodAnswerNums){
                if(!respChoices.selectedAnswerNums.includes(goodResp)){
                    ok=false; break;
                }
           }
           //ok est encore à true si toutes les bonnes réponses ont été sélectionnées
           //tester si pas trop de sélections (et donc mauvaises réponses en trop):
           if(respChoices.selectedAnswerNums.length != solutionsQuestion.goodAnswerNums.length){
               ok=false;
           }
           if(ok)
              qcmResults.nbGoodResponses++;
       }
       qcmResults.percentageScore=(qcmResults.nbGoodResponses*100)/qcm.nbQuestions;
    }
    return qcmResults;
}

//--------------------- admin QcmResults routes -----------------

qcmApiRouter.route('/qcm-api/private/role_admin/qcm_results/:id')
.get(asyncToResp(async function(req :Request, res :Response , next: NextFunction){
    let idQcmRes = req.params.id;
    let qcmRes = await qcmResultsService().findById(idQcmRes)
    return qcmRes;
}));

qcmApiRouter.route('/qcm-api/private/role_admin/qcm_results')
.get(asyncToResp(async function(req :Request, res :Response , next: NextFunction ) {
    //let  xyz = req.query.xyz;
    let qcmResArray = await qcmResultsService().findAll();
    /*if(xyz){
            //filtrage selon critère xyz:
        }*/
    return qcmResArray;
}));

//POST and PUT : NA (not applicable)


// DELETE http://localhost:8282/qcm-api/private/role_admin/qcm_results/1
qcmApiRouter.route('/qcm-api/private/role_admin/qcm_results/:id')
.delete(asyncToResp(async  function(req :Request, res :Response , next: NextFunction ) {
    let idQcmRes = req.params.id;
    await qcmResultsService().deleteById(idQcmRes)
    return{ "action" : "qcmResults with id="+idQcmRes + " was deleted"};
}));