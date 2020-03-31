import { PublicationDataService } from "../itf/PublicationDataService";
import { GenericMongoDataService } from "./generic/GenericMongoDataService";
import { Publication  } from "../../model/publication";
import { IdHelper, Auto_IdHelper } from "../itf/generic/IdHelper";
import { asyncInitPublicationDataPostServiceConstruct } from '../init/dataset';

// MongoDB implementation of NewsDataService 

export class MongoPublicationService 
       extends GenericMongoDataService<Publication,string>
       implements PublicationDataService {


    constructor(){
        super("mongo-test" , "pubs" /* ,  new Auto_IdHelper<Publication,string>("_id") by default */);
        asyncInitPublicationDataPostServiceConstruct(this).then(()=>console.log("MongoPublicationService.asyncPostConstruct done"));
    }

}