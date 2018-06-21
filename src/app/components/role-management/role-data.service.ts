import { Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { RoleModel } from './role-model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'; 
import { environment } from '../../../environments/environment';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleDataService {

  constructor(private http: HttpClient) {
    this.ngOnInit();
   }



ngOnInit(){
 

}

platformURL = environment.platformURL;
listOfApplicationCategory: string [] = [];
listOfActivationStatus: string[] = ["Active", "Inactive"];
listOfProcessingStatus: string[] = ["Pending Authorization", "Rejected"];



sampleDate: Date = new Date(); 


roleData: RoleModel[]=[];


createNewRole(role: RoleModel){
 this.roleData.push(role);
}

getRoleData(){
return this.http.get(`${this.platformURL}/api/role`);
}

getlistOfApplicationCategory(){
return this.http.get(`${this.platformURL}/api/applicationCodes`);
  
}


getListOfMenuGroups(applicationCode: string){
return this.http.get(`${this.platformURL}/api/menu/find`, {
 params: {
applicationCode: applicationCode
  }
});
}


saveRole(roleData){
  return this.http.post(`${this.platformURL}/api/role`, roleData);
}


}

