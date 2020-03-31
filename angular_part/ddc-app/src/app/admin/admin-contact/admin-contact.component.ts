import { Component, OnInit, ViewChild } from '@angular/core';
import { Contact } from 'src/app/common/data/Contact';
import { ContactService } from 'src/app/common/service/contact.service';
import { GenericCrudContext } from 'src/generic/GenericCrudContext';
import { GenericCrudAbstractContextHelper } from 'src/generic/GenericCrudAbstractContextHelper';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.scss']
})
export class AdminContactComponent implements OnInit , GenericCrudAbstractContextHelper<Contact>{
  
  public genericCrudContext : GenericCrudContext<Contact> = null;

  constructor(public contactService : ContactService) {
    this.genericCrudContext = new GenericCrudContext<Contact>(this);
   }

  ngOnInit() {
    this.genericCrudContext.onNewObjectGeneric();
  }

  //begin of implementation of methods of 
  //GenericCrudAbstractContextHelper interface:
  //--------------------------------------------

  public essentielObjectString(obj: Contact): string {
    return obj.nom + " ...";
  }
  public buildEmptyObject(): Contact {
    return new Contact();
  }

  getEntityTypeName(): string {
    return "contact";
  }

  onGetAllObjects(): void {
    this.contactService.getAllObjects()
    .subscribe((contacts:Contact[])=> { this.genericCrudContext.tabObjects = contacts;
                                      console.log("contacts="+JSON.stringify(contacts)); });
  }
  
  onSupprimerObject(): void {
    this.contactService.deleteEntityObjectServerSide(this.genericCrudContext.selectedObject._id)
    .subscribe(()=>{this.genericCrudContext.endOfDeleteGeneric() },
              (err)=>{this.genericCrudContext.msg="echec suppression";}
    );
  }
  

  //end of implementation of methods of 
  //GenericCrudAbstractContextHelper interface:
  //--------------------------------------------


   onSubmit(){
    if(this.genericCrudContext.mode=="newOne"){
       this.contactService.postEntityObject(this.genericCrudContext.selectedObject)
       .subscribe(
         (savedContact)=>{ this.genericCrudContext.addInTabAfterPostNewGeneric(savedContact); },
         (err)=>{console.log(err); this.genericCrudContext.msg="echec ajout/sauvegarde (id unique?)"}
       );
    }
    else {
       this.contactService.putEntityObject(this.genericCrudContext.selectedObject)
       .subscribe(
        (updatedContact)=>{this.genericCrudContext.msg="contact modifié/sauvegardé"; },
        (err)=>{console.log(err); this.genericCrudContext.msg="echec modification/sauvegarde"}
      );
    }
  }


}
