import { RessourceDataService } from "../itf/RessourceDataService";
import { GenericMongoDataService } from "./generic/GenericMongoDataService";
import { Ressource, RessourceObject  } from "../../model/ressource";
import { IdHelper, StaticIdHelper } from "../itf/generic/IdHelper";
import { asyncInitRessourceDataPostServiceConstruct } from '../init/dataset';

// MongoDB implementation of RessourceDataService 

export class MongoRessourceService 
       extends GenericMongoDataService<Ressource,string>
       implements RessourceDataService {


    constructor(){
        super("mongo-test" , "ressources" /* ,  new Auto_IdHelper<Ressource,string>("_id") by default */);
        asyncInitRessourceDataPostServiceConstruct(this).then(()=>console.log("MongoRessourceService.asyncPostConstruct done"));             
    }

}