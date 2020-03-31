import { RessourceDataService } from "../itf/RessourceDataService";
import { GenericNedbDataService } from "./generic/GenericNedbDataService";
import { Ressource , RessourceObject  } from "../../model/ressource";
import { IdHelper, StaticIdHelper } from "../itf/generic/IdHelper";
import { asyncInitRessourceDataPostServiceConstruct } from '../init/dataset';

// NeDB implementation of RessourceDataService 

export class NedbRessourceService 
       extends GenericNedbDataService<Ressource,string>
       implements RessourceDataService {


    constructor(){
        super("nedb-test" , "ressources" /* ,  new Auto_IdHelper<Ressource,string>("_id") by default */);
        asyncInitRessourceDataPostServiceConstruct(this).then(()=>console.log("NedbRessourceService.asyncPostConstruct done"));             				  
    }

}

