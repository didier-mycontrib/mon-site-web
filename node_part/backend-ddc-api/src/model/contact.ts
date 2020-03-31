export interface Contact  {
   _id :string ; 
   nom :string ;
   prenom :string ;
   adresse : string;
   telephone : string;
   email :string;
   objet :string;
   message :string;
   date: string;//"2019-09-20"
   statut:string; //"nouveau" ou ".."
}

//NB: la plupart des champs sont facultatifs

//export type ContactItf = Contact; /* simple type alias */


//real class for instanciation ,  with constructor .
export class ContactObject implements Contact {
   constructor(public  _id :string = null , 
               public nom:string = null,
			   public prenom:string = null,
			   public adresse : string= null,
			   public telephone : string= null,
               public email:string= null,
			   public objet:string= null,
			   public message:string= null,
			   public date:string= null,
			   public statut:string= null
			   ){
   }
}
