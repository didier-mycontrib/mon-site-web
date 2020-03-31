
import { LoginDataService } from '../itf/LoginDataService';
import { LoginObject } from '../../model/login';
import { cryptPwdIfNecessary } from '../../util/bcrypt-util';
import { MyAppConfig } from '../../config/MyAppConfig';
import { RessourceDataService } from '../itf/RessourceDataService';
import { RessourceObject } from '../../model/ressource';
import { ContactDataService } from '../itf/contactDataService';
import { ContactObject } from '../../model/contact';
import { QcmDataService } from '../itf/qcmDataService';
import { PublicationDataService } from '../itf/PublicationDataService';
import { PublicationObject, QcmObject, QuestionObject, AnswerObject, SolutionObject } from '../../model/index.data';


//------------------------login--------------------


export async function asyncInitLoginDataPostServiceConstruct(loginDataService :LoginDataService) : Promise<any>{
    if(MyAppConfig.isEmbeddedDB()){
        //"$2b$10$atmLfYi5x4ialZvGJgtmjOBvByw7aLufH772bxEOqywoku38zClmu" is bcrypt/10 for "pwduser1"
        //this.saveOrUpdate(new LoginObject("user1" , await cryptPwdIfNecessary("$2b$10$atmLfYi5x4ialZvGJgtmjOBvByw7aLufH772bxEOqywoku38zClmu") , "user"));
        loginDataService.saveOrUpdate(new LoginObject("user1" , await cryptPwdIfNecessary("pwduser1") , "user"));
        loginDataService.saveOrUpdate(new LoginObject("didier" , await cryptPwdIfNecessary("pwd") , "admin,publisher,user"));
    }else{
        loginDataService.saveOrUpdate(new LoginObject("didier" , await cryptPwdIfNecessary("$2b$10$qz.WZBiav68/PJXlMn6j4.DhguHi.7c8MS//QTwLVl1mSngnNu.3G") , "admin,publisher,user"));
    }
 }

 //------------------------contact--------------------


 export async function asyncInitContactDataPostServiceConstruct(contactDataService :ContactDataService) : Promise<any>{
   
    contactDataService.saveOrUpdate(new ContactObject("1" , "Defrance" , "Didier" , "24 rue Louise Damasse 27200 Vernon",
                          "0699244106" , "didier@d-defrance.fr" , "contact initial",
                          "message qui va bien" , "2020-02-22" , "ok" ));
   
    if(MyAppConfig.isEmbeddedDB()){

    }else{
        
    }
 }

 //------------------------ressource--------------------


 export async function asyncInitRessourceDataPostServiceConstruct(ressourceDataService :RessourceDataService) : Promise<any>{
    if(MyAppConfig.isEmbeddedDB()){
        ressourceDataService.saveOrUpdate(new RessourceObject("1" , "plan_spring" , "plan_spring.pdf" , "pdf",
                          "plan"  , "2020-02-17"));
        ressourceDataService.saveOrUpdate(new RessourceObject("2" , "plan_angular" , "plan_angular.pdf" , "pdf",
                          "plan"  , "2020-02-17"));
    }else{
       //...
    }

    ressourceDataService.saveOrUpdate(new RessourceObject("3" , "cv_D_Defrance_pdf" , "cv_D_Defrance.pdf" , "pdf",
                          "cv"  , "2020-02-17"));
    ressourceDataService.saveOrUpdate(new RessourceObject("4" , "cv_D_Defrance_docx" , "cv_D_Defrance.docx" , "document",
                          "cv"  , "2020-02-17"));
						  
    ressourceDataService.saveOrUpdate(new RessourceObject("5" , "didier_jpg" , "didier.jpg" , "image",
                          "ressources"  , "2020-02-17"));
    ressourceDataService.saveOrUpdate(new RessourceObject("6" , "classroom_jpg" , "classroom.jpg" , "image",
                          "ressources"  , "2020-02-17"));
    ressourceDataService.saveOrUpdate(new RessourceObject("7" , "coffee_jpg" , "coffee.jpg" , "image",
                          "ressources"  , "2020-02-17"));
    ressourceDataService.saveOrUpdate(new RessourceObject("8" , "didier_vernon_jpg" , "didier_vernon.jpg" , "image",
                          "ressources"  , "2020-02-17"));
    ressourceDataService.saveOrUpdate(new RessourceObject("9" , "laptop_jpg" , "laptop.jpg" , "image",
                          "ressources"  , "2020-02-17"));
    ressourceDataService.saveOrUpdate(new RessourceObject("10" , "nature_jpg" , "nature.jpg" , "image",
                          "ressources"  , "2020-02-17"));
    ressourceDataService.saveOrUpdate(new RessourceObject("11" , "code_jpg" , "code.jpg" , "image",
                          "ressources"  , "2020-02-17"));
    ressourceDataService.saveOrUpdate(new RessourceObject("12" , "modelisation_png" , "modelisation.png" , "image",
                          "ressources"  , "2020-02-17"));
    ressourceDataService.saveOrUpdate(new RessourceObject("13" , "domaines_competences_png" , "domaines_competences.png" , "image",
                          "ressources"  , "2020-02-17"));
    ressourceDataService.saveOrUpdate(new RessourceObject("14" , "competences_jee_spring_png" , "competences_jee_spring.png" , "image",
                          "ressources"  , "2020-02-17"));
    ressourceDataService.saveOrUpdate(new RessourceObject("15" , "competences_javascript_png" , "competences_javascript.png" , "image",
                          "ressources"  , "2020-02-17"));
    ressourceDataService.saveOrUpdate(new RessourceObject("16" , "competences_devops_png" , "competences_devops.png" , "image",
                          "ressources"  , "2020-02-17"));
    ressourceDataService.saveOrUpdate(new RessourceObject("17" , "competences_transverses_png" , "competences_transverses.png" , "image",
                          "ressources"  , "2020-02-17"));
 }

 //------------------------publication--------------------

 export async function asyncInitPublicationDataPostServiceConstruct(publicationDataService :PublicationDataService) : Promise<any>{


    if(MyAppConfig.isEmbeddedDB()){
        publicationDataService.saveOrUpdate( new PublicationObject("1" , "tour eiffel(mem)" , "tourEiffel.jpg","tour eiffel (Paris)" , 
        "<p> la <b>Tour Eiffel</b> mesure environ 300 mètres </p>","2019-07-12",null,null));
        publicationDataService.saveOrUpdate(  new PublicationObject("2" , "Mont Saint Michel(mem)" , "montSaintMichel.jpg","Mont Saint Michel" , 
       "<p> le <b>Mont Saint Michel</b> change de couleur très fréquemment </p>","2019-07-11",null,null));

    }else{
        
    }
 }

 //------------------------qcm--------------------


 export async function asyncInitQcmDataPostServiceConstruct(qcmDataService :QcmDataService) : Promise<any>{
   
    
    if(MyAppConfig.isEmbeddedDB()){
        qcmDataService.saveOrUpdate(new QcmObject("1" , "qcm1" , [ "js" ] , "public",
        null , null, 2,
        [
          new QuestionObject(1,"let or var or ... for global?",null,1,
              [
                 new AnswerObject("a","let"),
                 new AnswerObject("b","var"),
                 new AnswerObject("c","const"),
                 new AnswerObject("d","glob"),
              ]),
          new QuestionObject(2,"await in wich type of function?",null,1,
              [
                 new AnswerObject("a","void"),
                 new AnswerObject("b","global"),
                 new AnswerObject("c","async"),
                 new AnswerObject("d","then"),
              ])
        ],
        [
          new SolutionObject(1,['b']),
          new SolutionObject(2,['c'])
        ]));

        qcmDataService.saveOrUpdate(new QcmObject("2" , "qcm2" , [ "java" ] , "public",
        null , null, 2,
        [
          new QuestionObject(1,"keyword for inheritance ?",null,1,
              [
                 new AnswerObject("a","is"),
                 new AnswerObject("b","kindOf"),
                 new AnswerObject("c","extends"),
                 new AnswerObject("d","inherit"),
              ]),
          new QuestionObject(2,"keyword beetween class and interface",null,1,
              [
                 new AnswerObject("a","inherit"),
                 new AnswerObject("b","kindOd"),
                 new AnswerObject("c","class"),
                 new AnswerObject("d","implements"),
              ])
        ],
        [
          new SolutionObject(1,['c']),
          new SolutionObject(2,['d'])
        ],  
        "eval"));

    }else{
        
    }
 }