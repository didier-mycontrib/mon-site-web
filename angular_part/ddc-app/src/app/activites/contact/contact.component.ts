import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/common/data/Contact';
import { ContactService } from 'src/app/common/service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  msg=""; //message de statut (après envoie du contact)
      
@Input()
cardTitle : string = "Me contacter"; //valeur par defaut;

@Input()
withoutCoord : boolean = false; //valeur par defaut;

@Input()
sendButtonLabel : string = "Envoyer" ; //valeur par défaut

@Input()
contact : Contact = {  nom : "" , prenom : "" , adresse : null , telephone : null, 
                      email : "" , objet : "" , message : "" , 
                      date : this.convertDate(new Date()), statut : "nouveau" ,
                      }; //valeur par défaut;

convertDate(d) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  return [d.getFullYear(), pad(d.getMonth()+1) ,pad(d.getDate()) ].join('-');
}

  constructor(private _contactService : ContactService ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.msg="";
    this._contactService.postEntityObject(this.contact)
                        .subscribe(
                          postContact => { this.contact = postContact ; 
                                           this.msg = "contact bien enregistré: " + JSON.stringify(this.contact);} ,
                         error => { console.log(error); this.msg="erreur post contact"}                  
                        )
    
  }

  
}
