import { Component, OnInit, Input } from '@angular/core';
import { MenuDefinition } from 'src/bs-util/data/MenuDefinition';
import { AuthService } from '../common/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  title : string ="myApp" //as default value

  myMenuDefs :MenuDefinition[] = [    
    { label : "compétences" , 
      children : [
        { label : "qui suis-je ?" , path : "ngr/didier" },
        { label : "domaines de compétences" , path : "ngr/domCompetences" },
        { label : "CV" , path : "ngr/cv" } 
      ]
    },
    { label : "services" , 
    children : [
      { label : "prestations proposees" , path : "ngr/prestations" },
      { label : "plans de cours" , path : "ngr/plans" },
      { divider : true },
      { label : "QCM" , path : "ngr/qcm" },
      { divider : true },
      { label : "mes contributions" , path : "ngr/contributions" },
      { label : "news/avis/conseils" , path : "ngr/divers" }
    ]
  },
  { label : "dispos/contact" , 
  children : [
    { label : "disponibilités" , path : "ngr/disponibilites" },
    { label : "contact" , path : "ngr/contact" }
  ]
},
{ label : "admin" , 
children : [
  { label : "login" , path : "ngr/login" },
  { divider : true },
  { label : "admin-news" , path : "ngr/admin-news", role : "admin" },
  { label : "admin-contact" , path : "ngr/admin-contact", role : "admin" },
  { label : "admin-ressources" , path : "ngr/admin-ressources" , role : "admin"},
  { label : "admin-qcm" , path : "ngr/admin-qcm", role : "admin" },
  { label : "admin-qcm-results" , path : "ngr/admin-qcm-results", role : "admin" }
]
}

];

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
