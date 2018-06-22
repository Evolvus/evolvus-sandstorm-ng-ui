import { Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { RoleModel } from './role-model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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



sampleDate: Date = new Date(); 

roleData: RoleModel[]=[];


createNewRole(role: RoleModel){
 this.roleData.push(role);
}

getAllRoleData(){
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

getOneRoleData(roleName: string){
 return this.http.get(`${this.platformURL}/api/role/find`, {
 params: {
   roleName: roleName 
 }
});
}




saveRole(roleData){
  return this.http.post(`${this.platformURL}/api/role`, roleData);
}

deleteRole(roleData){
  return this.http.put(`${this.platformURL}/api/role/delete/` + roleData._id,{
    roleData: roleData
  });
}




openDialog(messageType, statusMessage): string {
  let dialogRef = this.dialog.open(ConfirmationDialogEntityComponent, {
    width: "300px",
    data: {
      message: statusMessage,
      type: messageType
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    return "success";
  });
  return "failure";

}







}

