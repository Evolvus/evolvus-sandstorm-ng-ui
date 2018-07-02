import { Observable, Subject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { RoleModel } from './role-model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { ConfirmationDialogEntityComponent } from "../../shared/confirmation-dialog-entity/confirmation-dialog-entity.component";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class RoleDataService {

  constructor(private http: HttpClient, private dialog: MatDialog) {
   }



ngOnInit(){
 

}

platformURL = environment.platformURL;
listOfApplicationCategory: string [] = [];
listOfActivationStatus: string[] = ["Active", "Inactive"];
listOfProcessingStatus: string[] = ["Pending Authorization", "Rejected"];
dialogClosed: Subject<boolean> = new Subject<boolean>();
roleTableHeaders = ['Role Name','Role Description','Application Category','Activation Status','Processing Status','Associated Users','Last Modified Date Time'];
defaultFilterCriteria = {
  applicationCode:undefined,
  activationStatus:undefined,
  processingStatus: "PENDING_AUTHORIZATION",
  pageSize: 5,
  pageNo: 1
} 
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

getAllRoleData(pageSize, pageNo){
return this.http.get(`${this.platformURL}/api/role`,{
  headers: this.defaultHeaders,
  params: {
    pageSize: pageSize,
    pageNo: pageNo
  }
});
}

getlistOfApplicationCategory(){
return this.http.get(`${this.platformURL}/api/applicationCodes`,{
  headers: this.defaultHeaders
});
}

getTableHeaders(){
return this.roleTableHeaders;
}

getDefaultFilterCriteria(){
  return this.defaultFilterCriteria;
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


getFilteredRoleData(applicationCode, activationStatus, processingStatus, pageSize, pageNo){
  return this.http.get(`${this.platformURL}/api/role/filter`,  {
    headers: this.defaultHeaders,
  params:  {
      applicationCode: applicationCode,
      activationStatus: activationStatus,
      processingStatus: processingStatus,
      pageSize: pageSize,
      pageNo: pageNo
    }

  });
}

save(roleData){
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

