import { QcmDataService, QcmResultsDataService } from "../itf/QcmDataService";
import { GenericMongoDataService } from "./generic/GenericMongoDataService";
import { Qcm, QcmResults  } from "../../model/qcm";
import { IdHelper, StaticIdHelper } from "../itf/generic/IdHelper";

// MongoDB implementation of RessourceDataService 

export class MongoQcmService 
       extends GenericMongoDataService<Qcm,string>
       implements QcmDataService {


    constructor(){
        super("mongo-test" , "qcm" /* ,  new Auto_IdHelper<Qcm,string>("_id") by default */);
    }

}


export class MongoQcmResultsService 
       extends GenericMongoDataService<QcmResults,string>
       implements QcmResultsDataService {


    constructor(){
        super("mongo-test" , "qcm_results" /* ,  new Auto_IdHelper<Qcm,string>("_id") by default */);
    }

}