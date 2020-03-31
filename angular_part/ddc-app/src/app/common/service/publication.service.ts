import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Publication } from "src/app/common/data/publication";
import { map } from 'rxjs/operators';
import { GenericRestCrudServiceWithUpload } from 'src/generic/service/generic-rest-crud-service';

@Injectable({
  providedIn: 'root'
})
export class PublicationService extends GenericRestCrudServiceWithUpload<Publication>{
  
  public settingUploadBaseUrl(): void {
    this.uploadBaseUrl="./news-api/private/role_publisher/upload_publication";
  }
  public settingPublicAndPrivateBaseUrl(): void {
    this.publicBaseUrl="./news-api/public/publication" ; //avec ng serve --proxy-config proxy.conf.json
    this.privateBaseUrl="./news-api/private/role_publisher/publication" ; //avec ng serve --proxy-config proxy.conf.json
  }
 
  constructor(http : HttpClient) { 
    super(http);
  }

}
