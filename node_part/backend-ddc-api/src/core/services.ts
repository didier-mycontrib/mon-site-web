import { MyAppConfig } from '../config/MyAppConfig';

import { ContactDataService } from './itf/contactDataService';
import { MongoContactService } from './mongo/MongoContactDataService';
import { NedbContactService } from './nedb/NedbContactDataService';

import { NedbLoginService} from "./nedb/NedbLoginDataService";
import { MongoLoginService } from './mongo/MongoLoginDataService';
import { LoginDataService } from './itf/LoginDataService';

import { PublicationDataService } from './itf/PublicationDataService';
import { MongoPublicationService } from './mongo/MongoPublicationDataService';
import { NedbPublicationService} from "./nedb/NedbPublicationDataService";

import { QcmDataService ,QcmResultsDataService } from './itf/qcmDataService';
import { MongoQcmService , MongoQcmResultsService } from './mongo/MongoQcmDataService';
import { NedbQcmService , NedbQcmResultsService} from './nedb/NedbQcmDataService';

import { RessourceDataService } from './itf/RessourceDataService';
import { MongoRessourceService } from './mongo/MongoRessourceDataService';
import { NedbRessourceService} from "./nedb/NedbRessourceDataService";


//------------ contactService ----------------

var  myContactService : ContactDataService  = null;
export function contactService() : ContactDataService {
    if(myContactService)
       return myContactService;
    //else
    if(MyAppConfig.isEmbeddedDB())
         return (myContactService=new NedbContactService());
    else
        return  (myContactService=new MongoContactService());
}

//------------ loginService ----------------

var  myLoginService : LoginDataService   = null;

export function loginService(){
    if(myLoginService==null){
           myLoginService = initLoginService();
    }
    return myLoginService;
}

function initLoginService() : LoginDataService {
    if(MyAppConfig.isEmbeddedDB())
         return new NedbLoginService();
    else
        return new MongoLoginService();
}

//------------ publicationService ----------------

var  myPublicationService : PublicationDataService  = null;

export function publicationService(){
    if(myPublicationService==null){
        myPublicationService = initPublicationService();
    }
    return myPublicationService;
}

function initPublicationService() : PublicationDataService {
  if(MyAppConfig.isEmbeddedDB())
       //return new MemPublicationService();
       return new NedbPublicationService();
  else
       return new MongoPublicationService();
}

//------------ qcmService -----------------

var  myQcmService : QcmDataService  = null;

export function qcmService(){
    if(myQcmService==null){
        myQcmService = initQcmService();
    }
    return myQcmService;
}

function initQcmService() : QcmDataService {
    if(MyAppConfig.isEmbeddedDB())
         return new NedbQcmService();
    else
        return new MongoQcmService();
}


//------------ qcmResultsService -----------------

var  myQcmResultsService : QcmResultsDataService  = null;

export function qcmResultsService(){
    if(myQcmResultsService==null){
        myQcmResultsService = initQcmResultsService();
    }
    return myQcmResultsService;
}

function initQcmResultsService() : QcmResultsDataService {
    if(MyAppConfig.isEmbeddedDB())
         return new NedbQcmResultsService();
    else
        return new MongoQcmResultsService();
}

//------------- ressourceService -----------------------

var  myRessourceService : RessourceDataService  = null;

export function ressourceService(){
    if(myRessourceService==null){
        myRessourceService = initRessourceService();
    }
    return myRessourceService;
}

function initRessourceService() : RessourceDataService {
  if(MyAppConfig.isEmbeddedDB())
       return new NedbRessourceService();
  else
       return new MongoRessourceService();
}

//-------------- all services --------------------------

export function initAllServices(){
    contactService();
    loginService();
    publicationService();
    qcmService();
    ressourceService();
}