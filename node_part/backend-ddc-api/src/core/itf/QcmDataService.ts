import { Qcm } from "../../model/qcm";
import { BasicCrudService } from "./generic/BasicCrudService";

export interface QcmDataService extends BasicCrudService<Qcm,string>{
    /*
     inherited methods from BasicCrudService:
     insert,update,saveOrUpdate(c: Qcm) : Promise<Qcm> ; 
     findById(id: string) : Promise<Qcm> ;
     deleteById(id: string) :Promise<void> ;
     findAll() : Promise<Qcm[]> ; 
     */
}


export interface QcmResultsDataService extends BasicCrudService<QcmResults,string>{
   
}
