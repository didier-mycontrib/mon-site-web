
import { GenericMongoDataService } from "./generic/GenericMongoDataService";
import { IdHelper, StaticIdHelper } from "../itf/generic/IdHelper";
import { Login, LoginObject } from '../../model/login';
import { LoginDataService } from '../itf/LoginDataService';
import { cryptPwdIfNecessary } from '../../util/bcrypt-util';
import { asyncInitLoginDataPostServiceConstruct } from '../init/dataset';

// MongoDB implementation of ContactDataService 

export class MongoLoginService 
       extends GenericMongoDataService<Login,string>
       implements LoginDataService {

    constructor(){
        super("mongo-test" , "logins" ,new StaticIdHelper<Login,string>("username"));
        asyncInitLoginDataPostServiceConstruct(this).then(()=>console.log("MongoLoginService.asyncPostConstruct done"));
    }

}