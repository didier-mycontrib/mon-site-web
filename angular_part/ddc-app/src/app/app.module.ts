import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { BsUtilModule } from 'src/bs-util/bs-util.module';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PresFormationComponent } from './services/prestations/pres-formation/pres-formation.component';
import { PresDeveloppementComponent } from './services/prestations/pres-developpement/pres-developpement.component';
import { PresConseilsComponent } from './services/prestations/pres-conseils/pres-conseils.component';
import { PreferTechnosComponent } from './services/divers/prefer-technos/prefer-technos.component';
import { DidierComponent } from './competences/didier/didier.component';
import { CvComponent } from './competences/cv/cv.component';
import { DomCompetencesComponent } from './competences/dom-competences/dom-competences.component';
import { PlansComponent } from './services/plans/plans.component';
import { ContributionsComponent } from './services/contributions/contributions.component';
import { DiversComponent } from './services/divers/divers.component';
import { DisponibilitesComponent } from './activites/disponibilites/disponibilites.component';
import { ContactComponent } from './activites/contact/contact.component';
import { PrestationsComponent } from './services/prestations/prestations.component';
import { QcmModule } from 'src/qcm/qcm.module';
import { LoginComponent } from './admin/login/login.component';
import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
import { JwtModule } from '@auth0/angular-jwt';
import { NewsComponent } from './services/divers/news/news.component';
import { AdminContactComponent } from './admin/admin-contact/admin-contact.component';
import { AdminRessourcesComponent } from './admin/admin-ressources/admin-ressources.component';
import { GenericModule } from 'src/generic/generic.module';
import { QcmRoutingModule } from 'src/qcm/qcm-routing.module';
import { ExternalLinksComponent } from './footer/external-links/external-links.component';
import { MentionsLegalesComponent } from './footer/mentions-legales/mentions-legales.component';

//this sub function will be used by automatic internal 
//interceptor of JwtModule (@auth0/angular-jwt)
export function myTokenGetter() {
  return /*localStorage.*/sessionStorage.getItem("authToken");
}
//NB: no need of MyAuthInterceptor if JwtModule has already
//his internal interceptor


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    FooterComponent,
    PresFormationComponent,
    PresDeveloppementComponent,
    PresConseilsComponent,
    PreferTechnosComponent,
    DidierComponent,
    CvComponent,
    DomCompetencesComponent,
    PlansComponent,
    ContributionsComponent,
    DiversComponent,
    NewsComponent,
    DisponibilitesComponent,
    ContactComponent,
    PrestationsComponent,
    LoginComponent,
    AdminNewsComponent,
    AdminContactComponent,
    AdminRessourcesComponent,
    ExternalLinksComponent,
    MentionsLegalesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,QcmRoutingModule,
    TabsModule.forRoot(),BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    BsUtilModule,
    GenericModule,
    QcmModule,
    JwtModule.forRoot({
      config: { tokenGetter: myTokenGetter}
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
