//const bcrypt = require('bcrypt');
import * as bcrypt from 'bcrypt';

export async function isPlainTextPwdMatchDatabasePwd(plainTextPwd:string,pwdInDataBase:string):Promise<boolean>{
    //const match = (plainTextPwd == pwdInDataBase); //without bcrypt 
    const match = await bcrypt.compare(plainTextPwd, pwdInDataBase);
    return match;
}

export async function cryptPwdIfNecessary(plainTextOrCryptedPwd:string):Promise<string>{
    let nbRounds = 0;
    let cryptedPwd : string = null;
    try{
    nbRounds= bcrypt.getRounds(plainTextOrCryptedPwd);
    }
    catch(err){
    }
    if (nbRounds >=10){
        //password already (b)crypted
        cryptedPwd=plainTextOrCryptedPwd;
    }else{
        cryptedPwd = await bcrypt.hash(plainTextOrCryptedPwd, 10 /*saltRounds*/);
    }
    return cryptedPwd;
}