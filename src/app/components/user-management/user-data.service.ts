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
  userTableHeaders = ['User Id','User Name','User Role','Designation','Phone Number','Mobile Number','Country','City'];
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
    
  
  constructor() { }


  getTableHeaders(){
    return this.userTableHeaders;
    }

    getDefaultFilterCriteria(){
      return this.defaultFilterCriteria;
    }

    



}
