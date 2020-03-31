export interface Ressource /* image , pdf, ... */{
    _id : string ;
    titre : string ; // 'titre facultatif de la ressource "
    res_fic_name : string; // nom du fichier (image ou pdf ou ...)
    res_type : string; // type/role technique de ressource "pdf" , "image" , "video" , ...
    res_categorie : string; //categorie fonctionnelle (ex: plan , ...)
    date: string; // date éventuelle : "2018-06-25"
}

//real class for instanciation ,  with constructor .
export class RessourceObject implements Ressource {
   constructor(
        public  _id :string = null , 
        public titre : string = null , 
        public res_fic_name : string= null , 
        public res_type : string= null , 
        public  res_categorie : string= null , 
        public  date: string= null , 
   ){
   }
}