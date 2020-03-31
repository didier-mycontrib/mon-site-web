import express  from 'express';
import * as bodyParser from 'body-parser';
const fileUpload  = require('express-fileupload');
export const  app :express.Application = express();
import { MyAppConfig } from './config/MyAppConfig';

import { apiErrorHandler} from './api/apiHandler'
import { globalRouter } from './api/globalRoutes';
import { contactApiRouter } from './api/contactApiRoutes';

import { publicationApiRouter } from './api/publicationApiRoutes';
import { qcmApiRouter } from './api/qcmApiRoutes';
import { ressourceApiRouter } from './api/ressourcesApiRoutes';
import { loginApiRouter } from './api/loginApiRoutes';
import { verifTokenInHeadersForPrivatePath, secureModeApiRouter } from './api/verif-auth';

import { myAppConnectionMap } from './core/db-connections';
import { initAllServices } from './core/services'; 
import { mySmtpUtil } from './util/smtp-util';

//PRE TRAITEMENTS (à placer en haut de server.ts)

//support parsing of JSON post data
var jsonParser = bodyParser.json() ;
app.use(jsonParser);

app.use(bodyParser.urlencoded({
    extended: true
  }));

//support for fileUpload:
app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
  }));

//renvoyer directement les pages statiques rangées dans le répertoire "front-end":
app.use(express.static('front-end'));

//verif auth beared token in request for private api/path:
app.use(verifTokenInHeadersForPrivatePath);

//ROUTES ORDINAIRES (apres PRE traitements , avant POST traitements)

app.use(globalRouter); //delegate some  global express routes
app.use(secureModeApiRouter); //dev-only ( http://localhost:8282/auth-api/dev-only/secure/true or false)
app.use(contactApiRouter);  //delegate some REST API routes
app.use(publicationApiRouter);  //delegate some REST API routes
app.use(qcmApiRouter);  //delegate some REST API routes
app.use(ressourceApiRouter);  //delegate some REST API routes
app.use(loginApiRouter); 

//POST TRAITEMENTS (à placer en bas de server.ts):

app.use(apiErrorHandler);


export const server = app.listen(process.env.PORT , function () {
    console.log("http://localhost:" + process.env.PORT );

    mySmtpUtil.getSmtpPwdAndInitSmtpTransporter();  

  //if not called here , initConnections() may be deffered (lazy)
  //call initConnections() is important for "init order":
  myAppConnectionMap.initConnections()
    .then((bOk)=>{ console.log("database connections is" +bOk);
               initAllServices();
              });

    //console.log("process.argv="+ process.argv);
    if(MyAppConfig.configuredSecureMode()==false){
      console.log("starting without security (dev-only , simple test)"); 
    }else {
      console.log("starting by default in secure mode (prod , integration test)"); 
    }

    if(MyAppConfig.isEmbeddedDB()){
      console.log("starting with neDB embedded Database (no mongoDB dependency)"); 
    }else{
      console.log("starting by default with mongoDB dependency"); 
    }                    
    console.log("rest express node server listening at " + process.env.PORT);
});