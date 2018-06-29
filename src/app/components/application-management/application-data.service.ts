import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDataService {


  platformURL = environment.platformURL;


  constructor(private http: HttpClient) { }


getAllApplications(){
 return this.http.get(`${this.platformURL}/api/application`);
  
}

}
