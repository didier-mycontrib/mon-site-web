import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from "src/app/common/data/Contact";
import { GenericRestCrudService } from 'src/generic/service/generic-rest-crud-service';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends GenericRestCrudService<Contact> {
 
  constructor(http : HttpClient) { 
    super(http);
  }

  public settingPublicAndPrivateBaseUrl(): void {
    this.publicBaseUrl = "./contact-api/public/contact" ; //avec ng serve --proxy-config proxy.conf.json
    this.privateBaseUrl = "./contact-api/private/role_admin/contact" ; //avec ng serve --proxy-config proxy.conf.json
  }

}


