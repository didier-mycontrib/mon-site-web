import { Request, Response ,NextFunction, Router} from 'express';
import * as  fileUpload  from 'express-fileupload';
type UploadedFile = fileUpload.UploadedFile;
import { asyncToResp } from './apiHandler';
import { ressourceService } from '../core/services';

export const ressourceApiRouter = Router();

// .../res-api/public/ressource/1 ou ...
ressourceApiRouter.route('/res-api/public/ressource/:id')
.get(asyncToResp(async function(req :Request, res :Response , next: NextFunction){
    let idRes = req.params.id;
    let ressource = await ressourceService().findById(idRes)
    return ressource;
}));

// http://localhost:8282/res-api/public/ressource renvoyant tout [ {} , {}]
// http://localhost:8282/res-api/public/ressource?... renvoyant [{}] selon critere
ressourceApiRouter.route('/res-api/public/ressource')
.get(asyncToResp(async function(req :Request, res :Response , next: NextFunction ) {
    //let  critereXy = req.query.critereXy;
    let resArray = await ressourceService().findAll();
    return resArray;
}));

// DELETE http://localhost:8282/res-api/private/role_publisher/ressource/xyz
ressourceApiRouter.route('/res-api/private/role_publisher/ressource/:idRes')
.delete(asyncToResp(async  function(req :Request, res :Response , next: NextFunction ) {
    let idRes = req.params.idRes;
    await ressourceService().deleteById(idRes)
    return{ "action" : "ressource with id="+idRes + " was deleted"};
}));



//multipart with .resFile and json { ... };
// POST : SAVE or UPDATE
ressourceApiRouter.route('/res-api/private/role_publisher/upload_ressource')
.post(asyncToResp(async  function(req :Request, res :Response , next: NextFunction ) {    
    var ressource = JSON.parse(req.body.ressource); // explicit JSON.parse() needed here because multipart / formData / upload
    //console.log("posting or reposting new ressource :" +JSON.stringify(ressource));
    
    if (!req.files){
        //console.log('No files were uploaded.');
    }
     else{
      // req.files.fileNameXyz (ici .resFile ) 
      let resFile = req.files.resFile as any as UploadedFile;
      let postFolderPath = "./front-end/posts/";
      if(resFile){
          if(ressource.res_type == "image"){
            postFolderPath = "./front-end/posts/images/";
          }
          // Use the mv() method to place the file somewhere on your server
          resFile.mv(postFolderPath + resFile.name, function(err) {
            if (err)
              console.log(resFile.name + " was not upload");
            else 
              console.log(resFile.name + " was upload in "+postFolderPath);
          });
      }
     }
    
    if(ressource){// POST : SAVE or UPDATE
      let savedRessource = await ressourceService().saveOrUpdate(ressource);
       return savedRessource;
    }				   
    }));
