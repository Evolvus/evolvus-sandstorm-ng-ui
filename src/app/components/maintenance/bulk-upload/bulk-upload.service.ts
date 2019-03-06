import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConfirmationDialogEntityComponent } from "../../../shared/confirmation-dialog-entity/confirmation-dialog-entity.component";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { SandstormGlobalVariablesService } from 'src/app/shared/sandstorm-global-variables.service';

// const HttpUploadOptions = {
//   headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
// }
@Injectable({
  providedIn: 'root'
})

export class BulkUploadService {

  currentLoggedInUserData: any = {};
platformURL = environment.platformURL;


  constructor(private http: HttpClient, private dialog: MatDialog, private globalVariableService: SandstormGlobalVariablesService) {
    this.getCurrentUserData().subscribe((response: any)=>{
      this.currentLoggedInUserData = response;
    })
   }


getListOfFileTypes(){
  return this.http.get(`${this.platformURL}/sandstorm/api/lookup`, {
    params:{
      lookupCode: "FILE_UPLOAD_CONSOLE"
    }
  });
}
getFileByName(fileName) {

  return this.http.get(`${this.platformURL}/sandstorm/api/fileUpload`,{
    params: {
      fileName: fileName
    }
  });
}
getAllFiles(pageSize, pageNo) {
  return this.http.get(`${this.platformURL}/sandstorm/api/fileUpload`, {
    params: {
      pageSize: pageSize,
      pageNo: pageNo
    }
  });
}
getCurrentUserData(){
  return this.globalVariableService.currentUser;
   }

upload(file, lookupCode, value)
{
  const formData = new FormData();
  formData.append('file', file);
  formData.append('lookupCode', lookupCode);
  formData.append('value', value);
   return this.http.post(`${this.platformURL}/bulkupload/api/v0.1/upload`, formData);
}

openDialog(messageType, statusMessage): any {


  let dialogRef = this.dialog.open(ConfirmationDialogEntityComponent, {
    width: "300px",
    data: {
      message: statusMessage,
      actionType: messageType,
      msgtype: messageType
    }
  });
  return dialogRef.afterClosed();
}

}
