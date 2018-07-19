import { EntityModel } from "./../entity-management/entity.model";
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";
import { ConfirmationDialogEntityComponent } from "../../shared/confirmation-dialog-entity/confirmation-dialog-entity.component";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class UserDataService {
  platformURL = environment.platformURL;

  userTableHeaders = [
    "User Id",
    "User Name",
    "Login Status",
    "Activation Status",
    "Processing Status",
    "User Role",
    "Last Updated Date"
  ];
  defaultFilterCriteria = {
    userLoginStatus: undefined,
    activationStatus: undefined,
    processingStatus: "PENDING_AUTHORIZATION",
    pageSize: 5,
    pageNo: 1
  };




  constructor(private http: HttpClient, private dialog: MatDialog) { }

  getTableHeaders() {
    return this.userTableHeaders;
  }

  getDefaultFilterCriteria() {
    return this.defaultFilterCriteria;
  }

  getAllTimeZones() {
    return this.http.get(`${this.platformURL}/sandstorm/api/masterTimeZone`);
  }
  getAllMasterCurrency() {
    return this.http.get(`${this.platformURL}/sandstorm/api/masterCurrency`);
  }
  getAllEntities() {
    return this.http.get(`${this.platformURL}/sandstorm/api/entity`);
  }
  getAllRoleData(pageSize, pageNo) {
    return this.http.get(`${this.platformURL}/sandstorm/api/role`);
  }
  getAllUserData(pageSize, pageNo) {
    return this.http.get(`${this.platformURL}/sandstorm/api/user`, {
      params: {
        pageSize: pageSize,
        pageNo: pageNo
      }
    });
  }

  save(userForm, listOfRoles, listOfEntities, listOfMasterCurrency) {
    var user = this.createUserObject(
      userForm,
      listOfRoles,
      listOfEntities,
      listOfMasterCurrency
    );
    return this.http.post(`${this.platformURL}/sandstorm/api/user`, user, {});
  }

  update(userForm, listOfRoles, listOfEntities, listOfMasterCurrency) {
    var user = this.createUserObject(
      userForm,
      listOfRoles,
      listOfEntities,
      listOfMasterCurrency
    );
    return this.http.put(
      `${this.platformURL}/sandstorm/api/user/` + user.userId,
      user
    );
  }

  private createUserObject(
    userForm,
    listOfRoles,
    listOfEntities,
    listOfMasterCurrency
  ): any {
    var selectedRole = listOfRoles.filter(
      role => role.roleName == userForm.controls.role.value
    );
    var selectedEntity = listOfEntities.filter(
      entity => entity.name == userForm.controls.entity.value
    );
    var selectedMasterCurrency = listOfMasterCurrency.filter(
      masterCurrency =>
        masterCurrency.currencyName == userForm.controls.currency.value
    );
    var userData = {
      userName: userForm.value.userName,
      userId: userForm.value.userId,
      designation: userForm.value.designation,
      role: selectedRole[0],
      entityId: selectedEntity[0].entityId,
      masterCurrency: userForm.value.currency,
      contact: {
        phoneNumber: userForm.value.phoneNumber,
        mobileNumber: userForm.value.mobileNumber,
        faxNumber: userForm.value.faxNumber,
        city: userForm.value.city,
        state: userForm.value.state,
        country: userForm.value.country,
        emailId: userForm.value.emailId
      },
      individualTransactionLimit: userForm.value.individualTransactionLimit,
      dailyLimit: userForm.value.dailyLimit
    };

    return userData;
  }

  getFilteredUserData(
    userLoginStatus,
    activationStatus,
    processingStatus,
    pageSize,
    pageNo
  ) {
    return this.http.get(`${this.platformURL}/sandstorm/api/user`, {
      params: {
        loginStatus: userLoginStatus,
        activationStatus: activationStatus,
        processingStatus: processingStatus,
        pageSize: pageSize,
        pageNo: pageNo
      }
    });
  }

  getOneUserData(userName) {
    return this.http.get(`${this.platformURL}/sandstorm/api/user`, {
      params: {
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
