import { PublicationDataService } from "../itf/PublicationDataService";
import { GenericNedbDataService } from "./generic/GenericNedbDataService";
import { Publication , PublicationObject  } from "../../model/publication";
import { IdHelper, StaticIdHelper } from "../itf/generic/IdHelper";
import { asyncInitPublicationDataPostServiceConstruct } from '../init/dataset';

// NeDB implementation of PublicationDataService 

export class NedbPublicationService 
       extends GenericNedbDataService<Publication,string>
       implements PublicationDataService {

    constructor(){
        super("nedb-test" , "publications" /* ,  new Auto_IdHelper<Publication,string>("_id") by default */);
        asyncInitPublicationDataPostServiceConstruct(this).then(()=>console.log("NedbPublicationService.asyncPostConstruct done"));
    }

}