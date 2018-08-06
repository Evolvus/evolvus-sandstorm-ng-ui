import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class BulkUploadService {

platformURL = environment.platformURL;

  constructor(private http: HttpClient) { }


getListOfFileTypes(){
  return this.http.get(`${this.platformURL}/sandstorm/api/lookup`, {
    params:{
      lookupCode: "IMPORT_TYPE"
    }
  });
}



}
