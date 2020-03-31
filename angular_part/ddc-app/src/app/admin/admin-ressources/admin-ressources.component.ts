import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericCrudAbstractContextHelper } from 'src/generic/GenericCrudAbstractContextHelper';
import { Ressource } from 'src/app/common/data/ressource';
import { GenericCrudContext } from 'src/generic/GenericCrudContext';
import { RessourceService } from 'src/app/common/service/ressource.service';

@Component({
  selector: 'app-admin-ressources',
  templateUrl: './admin-ressources.component.html',
  styleUrls: ['./admin-ressources.component.scss']
})
export class AdminRessourcesComponent implements OnInit, GenericCrudAbstractContextHelper<Ressource> {

  public resTypesSelectionnables = ["document" , "image" , "video" , "pdf" , "autres"];

  public resCategoriesSelectionnables = [ "ressource" , "plan" , "cv" , "illustration" , "avis" , "autres"];

   public genericCrudContext : GenericCrudContext<Ressource> = null;

   dateRessource : Date = new Date();
   fileToUpload: File = null;


  constructor(private _ressourceService : RessourceService) { 
    this.genericCrudContext = new GenericCrudContext<Ressource>(this);
  }

  onSubmit(){
    this.uploadData();
}

ngOnInit() {
  this.genericCrudContext.onNewObjectGeneric();
}

  
//begin of implementation of methods of 
  //GenericCrudAbstractContextHelper interface:
  //--------------------------------------------
  public buildEmptyObject(): Ressource {
    return new Ressource();
  }

  getEntityTypeName(): string {
    return "Ressource";
  }

  public essentielObjectString(res : Ressource) :string{
    return  res.titre  +  " ..."; 
  }

  onGetAllObjects(): void {
    this._ressourceService.getAllObjects()
    .subscribe((ressources:Ressource[])=> { this.genericCrudContext.tabObjects = ressources;
                                      /*console.log("ressources="+JSON.stringify(ressources));*/ },
                   error => {console.log(error); this.genericCrudContext.msg = "erreur" } );
  }
  
  onSupprimerObject(): void {
    this._ressourceService.deleteEntityObjectServerSide(this.genericCrudContext.selectedObject._id)
    .subscribe(()=>{this.genericCrudContext.endOfDeleteGeneric() },
              (err)=>{this.genericCrudContext.msg="echec suppression";}
    );
  }

  // --------------- optional methods of interface ---------

  public onChangeSelectedObjectPostGeneric() : void {
    this.initDateRessourceFromSelectedResDate();
    this.resetFileInputs();
    if(this.genericCrudContext.selectedObject._id){
      this.genericCrudContext.msg="sélection courante = publication existante modifiable"; 
    }
    else {
      this.genericCrudContext.msg=""; 
    }
  }
    
  public onNewObjectPostGeneric() : void{
    this.fileToUpload = null;
    this.genericCrudContext.selectedObject.res_type="document"; //par défaut
    this.genericCrudContext.selectedObject.res_categorie="ressource"; //par défaut
    this.initDateRessourceFromCurrentDate();
  }
  
  //end of implementation of methods of 
  //GenericCrudAbstractContextHelper interface:
  //---
  
  @ViewChild('f_file'  , {static : false}) 
 fileInput : any ;

 resetFileInputs(){
  if(this.fileInput && this.fileInput.nativeElement){
     // console.log("reset fileInput")
      this.fileInput.nativeElement.value = "";
  }
 }

 uploadData(){
  this.initSelectedResDateFromDateRessource();
  //console.log( "publication/message in the bottle" + JSON.stringify(this.selectedObject) ) ;

  const formData: FormData = new FormData();
  formData.append('resFile' , this.fileToUpload); //may be null
  formData.append('ressource' , JSON.stringify(this.genericCrudContext.selectedObject));
  //NB: JSON "ressource" data will be sent as a subpart of formData !!!!	
  this._ressourceService.uploadFormData(formData)
      .subscribe(
        sentRessource => { console.log("sent ressource:" + JSON.stringify(sentRessource));
                             this.genericCrudContext.msgSaveOrUpdate="ressource bien envoyée";
                             if(this.genericCrudContext.selectedObject._id==null){
                                this.genericCrudContext.selectedObject._id = sentRessource._id;
                             }
                             this.genericCrudContext.addInTabAfterPostNewGeneric(sentRessource);
                            } ,
        error => {console.log(error); this.genericCrudContext.msgSaveOrUpdate = "erreur" } 
        );
}


  private initDateRessourceFromCurrentDate(){
    let d : Date= new Date();
    this.dateRessource = d;
  } 

  private initSelectedResDateFromDateRessource(){
    let dpm = this.dateRessource;
    this.genericCrudContext.selectedObject.date = this.convertDate(dpm);
  }

  private initDateRessourceFromSelectedResDate(){
    let d : Date= new Date(this.genericCrudContext.selectedObject.date);
    this.dateRessource = d;
  }

  convertDate(d:Date) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    return [d.getFullYear(), pad(d.getMonth()+1) ,pad(d.getDate()) ].join('-');
  }
  handleResFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.genericCrudContext.selectedObject.res_fic_name=this.fileToUpload.name; //.name , .size , .type
    let ficName = this.genericCrudContext.selectedObject.res_fic_name;
    let posPoint = ficName.lastIndexOf('.');
    let ficNameSansExt = ficName.substring(0,posPoint);
    let ficExt = ficName.substring(posPoint+1);
    if(this.genericCrudContext.selectedObject.titre==null){
      //titre par defaut = fic name sans extension
      this.genericCrudContext.selectedObject.titre=ficNameSansExt;
    }
      
    switch(ficExt){
        case "jpg":
        case "jpeg":
        case "gif":
        case "png":
            this.genericCrudContext.selectedObject.res_type="image";
            break;
        case "pdf":
            this.genericCrudContext.selectedObject.res_type="pdf";
            break;
        case "mpeg":
            this.genericCrudContext.selectedObject.res_type="video";
            break;
        default:
            this.genericCrudContext.selectedObject.res_type="document";
            break;
      }
  } 

}

