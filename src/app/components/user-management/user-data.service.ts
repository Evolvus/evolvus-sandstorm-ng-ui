import { EntityModel } from './../entity-management/entity.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { ConfirmationDialogEntityComponent } from "../../shared/confirmation-dialog-entity/confirmation-dialog-entity.component";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {


  platformURL = environment.platformURL;
  userTableHeaders = ['User Id','User Name','Login Status', 'Activation Status', 'Processing Status','User Role', 'Last Updated Date'];
  defaultFilterCriteria = {
    userLoginStatus:undefined,
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
    
    listOfTimeZones: Object[]=
    [{zoneCode: "IST", offset: "UTC+5:30"},
     {zoneCode: "CDT", offset: "UTC-5:00"}];
     






  constructor(private http: HttpClient, private dialog: MatDialog) { }


  getTableHeaders(){
    return this.userTableHeaders;
    }

    getDefaultFilterCriteria(){
      console.log(this.defaultFilterCriteria, "Service method");
      return this.defaultFilterCriteria;
    }

    getAllTimeZones(){
      return this.http.get(`${this.platformURL}/sandstorm/api/masterTimeZone`);
      // return this.listOfMasterTimeZone;
    }
    getAllMasterCurrency(){
      return this.http.get(`${this.platformURL}/sandstorm/api/masterCurrency`);
      // return this.listOfMasterCurrency;
          }
    getAllEntities(){
      return this.http.get(`${this.platformURL}/sandstorm/api/entity`);
    }
    getAllRoleData(pageSize, pageNo){
      return this.http.get(`${this.platformURL}/sandstorm/api/role`);
      }
      getAllUserData(pageSize, pageNo){
        return this.http.get(`${this.platformURL}/sandstorm/api/user`);
        }
      
      save(userData){
        return this.http.post(`${this.platformURL}/sandstorm/api/user`, userData, {
        });
      }



      getFilteredUserData(userLoginStatus, activationStatus, processingStatus, pageSize, pageNo){
        return this.http.get(`${this.platformURL}/sandstorm/api/user`, {
          params:{
            loginStatus: userLoginStatus,
            activationStatus: activationStatus,
            processingStatus: processingStatus,
            pageSize: pageSize,
            pageNo: pageNo
          }
        });

      }

getOneUserData(userName){
    return this.http.get(`${this.platformURL}/sandstorm/api/user`, {
    params:{
      userName: userName 
    }
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
