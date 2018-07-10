import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ConfirmationDialogEntityComponent } from "../../shared/confirmation-dialog-entity/confirmation-dialog-entity.component";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Injectable()
export class EntityDataService {

    platformURL = environment.platformURL;
    entityTableHeaders = ['Entity Name','Parent Entity Name','Entity Level','Entity Code','Activation Status', 'Processing Status','Created User','Created Date Time'];
    defaultHeaders: HttpHeaders;
    defaultFilterCriteria = {
      parent:undefined,
      enableFlag:undefined,
      processingStatus: "PENDING_AUTHORIZATION",
      pageSize: 5,
      pageNo: 1
    } 

    constructor(public http: HttpClient, private dialog: MatDialog) { 
      this.defaultHeaders = new HttpHeaders({
            entityId: 'HOO1BOO1',
            tenantId: 'T001',
            accessLevel: '0'
            });
            

    }

    
    


  // getAllEntityData(pageSize, pageNo){
  //   return this.http.get(`${this.platformURL}/sandstorm/api/entity`,{
  //     params: {
  //       pageSize: pageSize,
  //       pageNo: pageNo
  //     }
    
  //   });
  // }

  getFilteredEntityData(parent, enableFlag, processingStatus, pageSize, pageNo){

    return this.http.get(`${this.platformURL}/sandstorm/api/entity`,  {
    params:  {
        parent: parent,
        enableFlag: enableFlag,
        processingStatus: processingStatus,
        pageSize: pageSize,
        pageNo: pageNo
      }
  
    });
  }  

    getAllEntities(pageSize, pageNo){
    return this.http.get(`${this.platformURL}/sandstorm/api/entity`, {
    params: {
     pageSize: pageSize,
     pageNo: pageNo
    },
    });
    }
  
     
    
    getOneEntityData(entityId){
    
    return this.http.get(`${this.platformURL}/sandstorm/api/entity`, {
    params:{
      entityCode: entityId 
    }
    });
    }

    save(entityData) {
        
     return  this.http.post(`${this.platformURL}/sandstorm/api/entity`, entityData);
}

update(entityData){
        
  return this.http.put(`${this.platformURL}/sandstorm/api/entity/` + entityData.entityCode, entityData);
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
  

  getTableHeaders(){
    return this.entityTableHeaders;
    }
    

    getDefaultFilterCriteria(){
      return this.defaultFilterCriteria;
    }

getBooleanValue(attribute){

  if(attribute=='true'){
    attribute = true;
     }else if(attribute=='false'){
      attribute = false;
     }
     return attribute;
}

}