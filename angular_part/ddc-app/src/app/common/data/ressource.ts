export class Ressource /* image , pdf, ... */{
    _id? : string ;
    titre : string ; // 'titre facultatif de la ressource "
    res_fic_name : string; // nom du fichier (image ou pdf ou ...)
    res_type : string; // type/role technique de ressource "pdf" , "image" , "video" , ...
    res_categorie : string; //categorie fonctionnelle (ex: plan , ...)
    date: string; // date éventuelle : "2018-06-25"

    selection? : boolean ; //selection locale seulement
}
