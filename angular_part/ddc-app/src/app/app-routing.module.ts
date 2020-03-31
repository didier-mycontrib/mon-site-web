import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PresFormationComponent } from './services/prestations/pres-formation/pres-formation.component';
import { PresDeveloppementComponent } from './services/prestations/pres-developpement/pres-developpement.component';
import { PresConseilsComponent } from './services/prestations/pres-conseils/pres-conseils.component';

import { DidierComponent } from './competences/didier/didier.component';
import { DomCompetencesComponent } from './competences/dom-competences/dom-competences.component';
import { CvComponent } from './competences/cv/cv.component';
import { PlansComponent } from './services/plans/plans.component';

import { ContributionsComponent } from './services/contributions/contributions.component';

import { DisponibilitesComponent } from './activites/disponibilites/disponibilites.component';
import { ContactComponent } from './activites/contact/contact.component';
import { PrestationsComponent } from './services/prestations/prestations.component';
import { QcmComponent } from 'src/qcm/qcm/qcm.component';
import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
import { CanActivatePublisherRouteGuard } from './common/gard/can-activate-route-guard';
import { LoginComponent } from './admin/login/login.component';
import { DiversComponent } from './services/divers/divers.component';
import { AdminQcmComponent } from 'src/qcm/admin-qcm/admin-qcm.component';
import { AdminContactComponent } from './admin/admin-contact/admin-contact.component';
import { AdminRessourcesComponent } from './admin/admin-ressources/admin-ressources.component';
import { ExternalLinksComponent } from './footer/external-links/external-links.component';
import { MentionsLegalesComponent } from './footer/mentions-legales/mentions-legales.component';
import { AdminQcmResultsComponent } from 'src/qcm/admin-qcm-results/admin-qcm-results.component';


const routes: Routes = [
  { path: 'ngr/welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'ngr/welcome', pathMatch: 'full'},

  { path: 'ngr/presFormation', component: PresFormationComponent },
  { path: 'ngr/presDeveloppement', component: PresDeveloppementComponent },
  { path: 'ngr/presConseils', component: PresConseilsComponent },
  
  { path: 'ngr/didier', component: DidierComponent },
  { path: 'ngr/domCompetences', component: DomCompetencesComponent },
  { path: 'ngr/cv', component: CvComponent },

  { path: 'ngr/prestations', component: PrestationsComponent },
  { path: 'ngr/plans', component: PlansComponent },
  
  { path: 'ngr/contributions', component: ContributionsComponent },
  { path: 'ngr/divers', component: DiversComponent },

  { path: 'ngr/disponibilites', component: DisponibilitesComponent },
  { path: 'ngr/contact', component: ContactComponent },

  { path: 'ngr/login', component: LoginComponent } ,
  { path: 'ngr/admin-news', component: AdminNewsComponent , canActivate: [CanActivatePublisherRouteGuard] } ,
  { path: 'ngr/admin-contact', component: AdminContactComponent , canActivate: [CanActivatePublisherRouteGuard] } ,
  { path: 'ngr/admin-ressources', component: AdminRessourcesComponent , canActivate: [CanActivatePublisherRouteGuard] } ,
  { path: 'ngr/admin-qcm', component: AdminQcmComponent , canActivate: [CanActivatePublisherRouteGuard]  },
  { path: 'ngr/admin-qcm-results', component: AdminQcmResultsComponent , canActivate: [CanActivatePublisherRouteGuard]  },
  
  { path: 'ngr/links', component: ExternalLinksComponent } ,
  { path: 'ngr/mentions-legales', component: MentionsLegalesComponent  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
