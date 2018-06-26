import { Observable, Subject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { RoleModel } from './role-model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators'; 
import { environment } from '../../../environments/environment';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmationDialogEntityComponent } from "../../shared/confirmation-dialog-entity/confirmation-dialog-entity.component";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class RoleDataService {

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.ngOnInit();
   }



ngOnInit(){
 

}

platformURL = environment.platformURL;
listOfApplicationCategory: string [] = [];
listOfActivationStatus: string[] = ["Active", "Inactive"];
listOfProcessingStatus: string[] = ["Pending Authorization", "Rejected"];
dialogClosed: Subject<boolean> = new Subject<boolean>();
defaultHeaders: HttpHeaders = new HttpHeaders({
entityCode: 'defaultEntity',
tenantId: 'EVL',
accessLevel: '0'
});

sampleDate: Date = new Date(); 

roleData: RoleModel[]=[];


createNewRole(role: RoleModel){
 this.roleData.push(role);
}

getAllRoleData(){
return this.http.get(`${this.platformURL}/api/role`,{
  headers: this.defaultHeaders

});
}

getlistOfApplicationCategory(){
return this.http.get(`${this.platformURL}/api/applicationCodes`,{
  headers: this.defaultHeaders
});
}


getListOfMenuGroups(applicationCode: string){
return this.http.get(`${this.platformURL}/api/menu/find`, {
  headers: this.defaultHeaders,
 params: {
applicationCode: applicationCode
  }
});
}

getOneRoleData(roleName: string){
 return this.http.get(`${this.platformURL}/api/role/find`, {
  headers: this.defaultHeaders,
 params: {
   roleName: roleName 
 }
});
}


getFilteredRoleData(applicationCode, activationStatus, processingStatus){
  return this.http.get(`${this.platformURL}/api/role/filter`,  {
    headers: this.defaultHeaders,
  params:  {
      applicationCode: applicationCode,
      activationStatus: activationStatus,
      processingStatus: processingStatus
    }

  });
}

saveRole(roleData){
  return this.http.post(`${this.platformURL}/api/role`, roleData, {
    headers: this.defaultHeaders

  });
}
updateRole(roleData){
  return this.http.put(`${this.platformURL}/api/role/` + roleData._id,{
    headers: this.defaultHeaders,

    roleData: roleData
  });
}
deleteRole(roleData){
  return this.http.put(`${this.platformURL}/api/role/delete/` + roleData._id,{
    headers: this.defaultHeaders,
    roleData: roleData
  });
}




openDialog(messageType, statusMessage): any {
  let dialogRef = this.dialog.open(ConfirmationDialogEntityComponent, {
    width: "300px",
    data: {
      message: statusMessage,
      type: messageType
    }
  });

  return dialogRef.afterClosed();
  
}







}

