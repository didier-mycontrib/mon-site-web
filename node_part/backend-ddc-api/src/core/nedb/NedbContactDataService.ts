import { ContactDataService } from "../itf/ContactDataService";
import { GenericNedbDataService } from "./generic/GenericNedbDataService";
import { Contact , ContactObject  } from "../../model/contact";
import { IdHelper, StaticIdHelper } from "../itf/generic/IdHelper";
import { asyncInitContactDataPostServiceConstruct } from '../init/dataset';

// NeDB implementation of ContactDataService 

export class NedbContactService 
       extends GenericNedbDataService<Contact,string>
       implements ContactDataService {


    constructor(){
        super("nedb-test" , "contacts" /* ,  new Auto_IdHelper<Contact,string>("_id") by default */);
        asyncInitContactDataPostServiceConstruct(this).then(()=>console.log("NedbContactService.asyncPostConstruct done"));
    }

}
