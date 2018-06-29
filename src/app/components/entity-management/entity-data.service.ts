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
      processingStatus: "PENDING_AUTHORIZATION"
    } 

    constructor(public http: HttpClient, private dialog: MatDialog) { 
      this.defaultHeaders = new HttpHeaders({
            entityId: 'abc12',
            tenantId: 'IVL',
            accessLevel: '1'
            });
            

    }

    
    


  getAllEntityData(){
    return this.http.get(`${this.platformURL}/api/entity`,{
      headers: this.defaultHeaders
    
    });
  }

  getFilteredEntityData(parent, enableFlag, processingStatus){
   enableFlag =  this.getBooleanValue(enableFlag);

    return this.http.get(`${this.platformURL}/api/entity/filter`,  {
      headers: this.defaultHeaders,
    params:  {
      parent: parent,
        enableFlag: enableFlag,
        processingStatus: processingStatus
      }
  
    });
  }  

    getAllEntityNames(){
    return this.http.get(`${this.platformURL}/api/entityNames`, {
    headers: this.defaultHeaders
    });
    }
  
     
    
    getOneEntityData(entityId){
    
    return this.http.get(`${this.platformURL}/api/entity/find`, {
    headers: this.defaultHeaders,
    params:{
      entityId: entityId 
    }
    });
    }

    save(entityData) {
      entityData.enableFlag =  this.getBooleanValue(entityData.enableFlag);
        
     return  this.http.post(`${this.platformURL}/api/entity`, entityData, {
           headers: this.defaultHeaders
       });
}

update(entityData){
  entityData.enableFlag =  this.getBooleanValue(entityData.enableFlag);
        
  return  this.http.put(`${this.platformURL}/api/entity/` + entityData._id , {
        headers: this.defaultHeaders,
        entityData: entityData

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