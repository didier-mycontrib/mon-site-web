import { QcmDataService, QcmResultsDataService } from "../itf/QcmDataService";
import { GenericNedbDataService } from "./generic/GenericNedbDataService";
import { Qcm , QcmObject, QuestionObject, SolutionObject, AnswerObject, QcmResults  } from "../../model/qcm";
import { IdHelper, StaticIdHelper } from "../itf/generic/IdHelper";
import { asyncInitQcmDataPostServiceConstruct } from '../init/dataset';

// NeDB implementation of QcmDataService 

export class NedbQcmService 
       extends GenericNedbDataService<Qcm,string>
       implements QcmDataService {


    constructor(){
        super("nedb-test" , "qcm" /* ,  new Auto_IdHelper<Qcm,string>("_id") by default */);
        asyncInitQcmDataPostServiceConstruct(this).then(()=>console.log("NedbQcmService.asyncPostConstruct done"));
    }

}


export class NedbQcmResultsService 
       extends GenericNedbDataService<QcmResults,string>
       implements QcmResultsDataService {


    constructor(){
        super("nedb-test" , "qcm_results" /* ,  new Auto_IdHelper<Qcm,string>("_id") by default */);
    }

}


