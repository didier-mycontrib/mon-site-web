import { Ressource } from "../../model/ressource";
import { BasicCrudService } from "./generic/BasicCrudService";

export interface RessourceDataService extends BasicCrudService<Ressource,string>{
    /*
     inherited methods from BasicCrudService:
     insert,update,saveOrUpdate(c: Ressource) : Promise<Ressource> ; 
     findById(id: string) : Promise<Ressource> ;
     deleteById(id: string) :Promise<void> ;
     findAll() : Promise<Ressource[]> ; 
     */
}
