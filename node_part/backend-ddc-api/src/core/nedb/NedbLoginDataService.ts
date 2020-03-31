import { LoginDataService } from "../itf/LoginDataService";
import { GenericNedbDataService } from "./generic/GenericNedbDataService";
import { Login , LoginObject  } from "../../model/login";
import { IdHelper, StaticIdHelper } from "../itf/generic/IdHelper";
import { cryptPwdIfNecessary } from '../../util/bcrypt-util';
import { asyncInitLoginDataPostServiceConstruct } from '../init/dataset';

// MongoDB implementation of LoginDataService 

export class NedbLoginService 
       extends GenericNedbDataService<Login,string>
       implements LoginDataService {

 
    constructor(){
        super("nedb-test" , "login" ,  new StaticIdHelper<Login,string>("username"));
        asyncInitLoginDataPostServiceConstruct(this).then(()=>console.log("NedbLoginService.asyncPostConstruct done"));
    }

}