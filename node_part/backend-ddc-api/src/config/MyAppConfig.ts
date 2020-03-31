export class MyAppConfig {
    private static embeddedDB : boolean = null ;
    private static secureMode : boolean = null ;

    static initialize(){
        if(process.argv.includes("--embeddedDB")){
            MyAppConfig.embeddedDB = true;  //neDB
          }else{
            MyAppConfig.embeddedDB = false; //real mongoDB base
          }

        if(process.argv.includes("--unsecure")){
            MyAppConfig.secureMode = false; //unsecure for dev-only
          }else{
            MyAppConfig.secureMode = true;  //secure by default
          }
    }

    public static isEmbeddedDB() : boolean{
        if(MyAppConfig.embeddedDB==null){
            MyAppConfig.initialize();
        }
        return MyAppConfig.embeddedDB;
    }

    public static configuredSecureMode() : boolean{
        if(MyAppConfig.secureMode==null){
            MyAppConfig.initialize();
        }
        return MyAppConfig.secureMode;
    }
}