import { ContactDataService } from "../itf/ContactDataService";
import { GenericMongoDataService } from "./generic/GenericMongoDataService";
import { Contact, ContactObject  } from "../../model/contact";
import { IdHelper, StaticIdHelper } from "../itf/generic/IdHelper";
import { asyncInitContactDataPostServiceConstruct } from '../init/dataset';

// MongoDB implementation of ContactDataService 

export class MongoContactService 
       extends GenericMongoDataService<Contact,string>
       implements ContactDataService {


    constructor(){
        super("mongo-test" , "contacts" /* ,  new Auto_IdHelper<Contact,string>("_id") by default */);
        asyncInitContactDataPostServiceConstruct(this).then(()=>console.log("MongoContactService.asyncPostConstruct done"));
    }

}