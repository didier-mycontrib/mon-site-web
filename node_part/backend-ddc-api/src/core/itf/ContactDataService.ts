import { Contact } from "../../model/contact";
import { BasicCrudService } from "./generic/BasicCrudService";

export interface ContactDataService extends BasicCrudService<Contact,string>{
    /*
     inherited methods from BasicCrudService:
     insert,update,saveOrUpdate(c: Contact) : Promise<Contact> ; 
     findById(id: string) : Promise<Contact> ;
     deleteById(id: string) :Promise<void> ;
     findAll() : Promise<Contact[]> ; 
     */
}
