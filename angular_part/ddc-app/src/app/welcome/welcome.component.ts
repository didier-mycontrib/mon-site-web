import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public myCarrouselDefs=[
    { image : "posts/images/coffee.jpg" , text : "études - conseils" , path:"/ngr/presConseils" }, 
    { image: "posts/images/classroom.jpg" , text : "animation de formation" , path:"/ngr/presFormation" },
    { image : "posts/images/didier_vernon.jpg", text : "Vernon - Didier Defrance"  , path:"/ngr/didier" },
    { image : "posts/images/code.jpg" , text : "développement web (frontEnd et backEnd)" , path:"/ngr/presDeveloppement" }, 
    { image: "posts/images/modelisation.png" , text : "analyse et conception" , path:"/ngr/presConseils" },
    { image : "posts/images/laptop.jpg", text : "Conseil en informatique"  , path:"/ngr/presConseils" }
  ];

  constructor() { }

  ngOnInit() {
  }

}
