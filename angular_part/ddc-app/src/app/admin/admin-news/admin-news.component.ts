import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, NgForm } from '@angular/forms';
import { PublicationService } from '../../common/service/publication.service';
import { Publication } from '../../common/data/publication';
import { GenericCrudAbstractContextHelper } from 'src/generic/GenericCrudAbstractContextHelper';
import { GenericCrudContext } from 'src/generic/GenericCrudContext';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss']
})
export class AdminNewsComponent implements OnInit , GenericCrudAbstractContextHelper<Publication> {
  
  public genericCrudContext : GenericCrudContext<Publication> = null;


  datePublication : Date = new Date();
 

  detailType : string  = "none"; //ou "link" ou "file" ou "text"

  imageFileToUpload: File = null;
  detailFileToUpload: File = null;
  //let formData : Form; in onSubmit() /uploadData() 
  //     where JSON "publication" data will be sent as a subpart of formData !!!!	


  constructor(private _publicationService : PublicationService){
    this.genericCrudContext = new GenericCrudContext<Publication>(this);
  }

//begin of implementation of methods of 
  //GenericCrudAbstractContextHelper interface:
  //--------------------------------------------
  public buildEmptyObject(): Publication {
    return new Publication();
  }

  getEntityTypeName(): string {
    return "Publication";
  }

  public essentielObjectString(pub : Publication) :string{
    return  pub.date + " , " + pub.titre ; 
  }

  onGetAllObjects(): void {
    this._publicationService.getAllObjects()
    .subscribe((publications:Publication[])=> { this.genericCrudContext.tabObjects = publications;
                                      /*console.log("publications="+JSON.stringify(publications));*/ },
                   error => {console.log(error); this.genericCrudContext.msg = "erreur" } );
  }
  
  onSupprimerObject(): void {
    this._publicationService.deleteEntityObjectServerSide(this.genericCrudContext.selectedObject._id)
    .subscribe(()=>{this.genericCrudContext.endOfDeleteGeneric() },
              (err)=>{this.genericCrudContext.msg="echec suppression";}
    );
  }

  // --------------- optional methods of interface ---------

  public onChangeSelectedObjectPostGeneric() : void {
    this.initDatePublicationFromSelectedPubDate();
    this.resetFileInputs();
    if(this.genericCrudContext.selectedObject._id){
      this.genericCrudContext.msg="sélection courante = publication existante modifiable"; 
      if(this.genericCrudContext.selectedObject.texte_complet!=null)
        this.detailType="text";
      else if(this.genericCrudContext.selectedObject.lien_externe!=null)
          this.detailType="link";
      else if(this.genericCrudContext.selectedObject.fichier_details_name!=null)
        this.detailType="file";
      else 
         this.detailType="none";
    }
    else {
      this.genericCrudContext.msg=""; this.detailType="none";
    }
  }
    
  public onNewObjectPostGeneric() : void{
    this.detailType="none";
    this.imageFileToUpload = null;
    this.detailFileToUpload = null;
    this.initDatePublicationFromCurrentDate();
  }
  
  //end of implementation of methods of 
  //GenericCrudAbstractContextHelper interface:
  //--------------------------------------------

  

@ViewChild('formPublication', { static : false}) 
form : NgForm ;

 
  public onFormInit(){

  }

  private initDatePublicationFromCurrentDate(){
    let d : Date= new Date();
    this.datePublication = d;
  } 

  private initSelectedPubDateFromDatePublication(){
    let dpm = this.datePublication;
    this.genericCrudContext.selectedObject.date = this.convertDate(dpm);
  }

  private initDatePublicationFromSelectedPubDate(){
    let d : Date= new Date(this.genericCrudContext.selectedObject.date);
    this.datePublication = d;
  }
   
 @ViewChild('f_imageFile' , {static : false}) 
 imageFileInput : any ;

 @ViewChild('f_detailsFile'  , {static : false}) 
 detailsFileInput : any ;

 resetFileInputs(){
  if(this.imageFileInput && this.imageFileInput.nativeElement){
     // console.log("reset imageFileInput")
      this.imageFileInput.nativeElement.value = "";
  }
  if(this.detailsFileInput && this.detailsFileInput.nativeElement){
    // console.log("reset detailsFileInput")
    this.detailsFileInput.nativeElement.value = "";
  }
 }

  onSubmit(){
        this.uploadData();
  }

  ngOnInit() {
    this.genericCrudContext.onNewObjectGeneric();
  }


convertDate(d:Date) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  return [d.getFullYear(), pad(d.getMonth()+1) ,pad(d.getDate()) ].join('-');
}

  uploadData(){
    this.initSelectedPubDateFromDatePublication();
    //console.log( "publication/message in the bottle" + JSON.stringify(this.selectedObject) ) ;

    //supprimer éventuelles informations incohérentes:
    switch(this.detailType){
      case "none":
         this.detailFileToUpload=null;
         this.genericCrudContext.selectedObject.fichier_details_name=null;
         this.genericCrudContext.selectedObject.texte_complet=null;
         this.genericCrudContext.selectedObject.lien_externe=null;
         break;
     case "link":
         this.detailFileToUpload=null;
         this.genericCrudContext.selectedObject.fichier_details_name=null;
         this.genericCrudContext.selectedObject.texte_complet=null;
         break; 
    case "file":
         this.genericCrudContext.selectedObject.lien_externe=null;
         this.genericCrudContext.selectedObject.texte_complet=null;
         break; 
    case "text":
         this.detailFileToUpload=null;
         this.genericCrudContext.selectedObject.fichier_details_name=null;
         this.genericCrudContext.selectedObject.lien_externe=null;
         break;  
    }

    const formData: FormData = new FormData();
    formData.append('imageFile' , this.imageFileToUpload); //may be null
    formData.append('detailsFile' , this.detailFileToUpload); //may be null
    formData.append('publication' , JSON.stringify(this.genericCrudContext.selectedObject));
    //NB: JSON "publication" data will be sent as a subpart of formData !!!!	
    this._publicationService.uploadFormData(formData)
        .subscribe(
          sentPublication => { console.log("sent publication:" + JSON.stringify(sentPublication));
                               this.genericCrudContext.msgSaveOrUpdate="publication bien envoyée";
                               if(this.genericCrudContext.selectedObject._id==null){
                                  this.genericCrudContext.selectedObject._id = sentPublication._id;
                               }
                               this.genericCrudContext.addInTabAfterPostNewGeneric(sentPublication);
                              } ,
          error => {console.log(error); this.genericCrudContext.msgSaveOrUpdate = "erreur" } 
          );
  }


  handleImageFileInput(files: FileList) {
    this.imageFileToUpload = files.item(0);
    this.genericCrudContext.selectedObject.fichier_image_name=this.imageFileToUpload.name; //.name , .size , .type
  } 
  
  handleDetailFileInput(files: FileList) {
    this.detailFileToUpload = files.item(0);
    this.genericCrudContext.selectedObject.fichier_details_name=this.detailFileToUpload.name; //.name , .size , .type
  } 

}
