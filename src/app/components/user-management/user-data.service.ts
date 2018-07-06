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
    
    listOfTimeZones: Object[]=
    [{zoneCode: "IST", offset: "UTC+5:30"},
     {zoneCode: "CDT", offset: "UTC-5:00"}];
     

listOfMasterCurrency: Object[]=[
  { tenantId: "T001",
  currencyCode: "DZD",
  currencyName: "Algerian dinar",
  decimalDigit: 2,
  delimiter: 12,
  createdBy: "SYSTEM",
  updatedBy: "SYSTEM",
  createdDate: "2018-07-04T10:20:05.552Z",
  lastUpdatedDate: "2018-09-04T10:20:05.552Z",
  objVersion: 123,
  enableFlag: "1",
  currencyLocale: "local"
},
{ tenantId: "T001",
currencyCode: "INR",
currencyName: "Indian Rupee",
decimalDigit: 2,
delimiter: 12,
createdBy: "SYSTEM",
updatedBy: "SYSTEM",
createdDate: "2018-04-04T10:20:05.552Z",
lastUpdatedDate: "2018-09-04T10:20:05.552Z",
objVersion: 125,
enableFlag: "1",
currencyLocale: "local"
}
];

listOfMasterTimeZone: Object[]=[
  { enableFlag : "1",
  tenantId : "T001",
  zoneCode: "IST",
  zoneName : "India",
  offsetValue : "+05.30",
  createdBy : "SYSTEM",
  updatedBy : "SYSTEM",
  createdDate : "2018-07-04T10:20:05.552Z",
  lastUpdatedDate : "2018-07-04T10:20:05.552Z",
  offSet : "UTC+05:30",
  objVersion : 1234,

},
{ enableFlag : "1",
tenantId : "T001",
zoneCode: "CST",
zoneName : "China",
offsetValue : "+08.00",
createdBy : "SYSTEM",
updatedBy : "SYSTEM",
createdDate : "2018-07-04T10:20:05.552Z",
lastUpdatedDate : "2018-07-04T10:20:05.552Z",
offSet : "UTC+08:00",
objVersion : 1234,

}];

// listOfSupportedDateFormats: Object[]=[
//  { enabledFlag : "1",
//   tenantId : "T001",
//   formatCode : "dd/mm/yyyy",
//   timeFormat : "hh:mm:ss",
//   description : "This is supportedDateFormat 1",
//   createdDate : "2018-07-04T12:46:43.628Z",
//   lastUpdatedDate: "2018-07-04T12:46:43.628Z",
//   createdBy : "SYSTEM",
//   updatedBy : "SYSTEM",
//   objVersion : 1,
// },
// { enabledFlag : "1",
// tenantId : "T001",
// formatCode : "mm/dd/yyyy",
// timeFormat : "hh:mm:ss",
// description : "This is supportedDateFormat 2",
// createdDate : "2018-07-04T12:46:43.628Z",
// lastUpdatedDate: "2018-07-04T12:46:43.628Z",
// createdBy : "SYSTEM",
// updatedBy : "SYSTEM",
// objVersion : 1,
// }];


  constructor(private http: HttpClient, private dialog: MatDialog) { }


  getTableHeaders(){
    return this.userTableHeaders;
    }

    getDefaultFilterCriteria(){
      return this.defaultFilterCriteria;
    }

    getAllTimeZones(){
return this.listOfTimeZones;
    }
    getAllMasterCurrency(){
      return this.listOfMasterCurrency;
          }
    getAllEntities(){
      var pageSize = "0";
      var pageNo = "1";
      return this.http.get(`${this.platformURL}/sandstorm/api/entity`,{
        headers: this.defaultHeaders,
        params: {
          pageSize: pageSize,
          pageNo: pageNo
        }
      
      });
    }
    getAllRoleData(pageSize, pageNo){
      return this.http.get(`${this.platformURL}/sandstorm/api/role`,{
        headers: this.defaultHeaders,
        params: {
          pageSize: pageSize,
          pageNo: pageNo
        }
      });
      }
      
      save(userData){
        return this.http.post(`${this.platformURL}/sandstorm/api/user`, userData, {
          headers: this.defaultHeaders
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
