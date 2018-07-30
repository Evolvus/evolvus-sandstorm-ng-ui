import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { ConfirmationDialogEntityComponent } from "../../shared/confirmation-dialog-entity/confirmation-dialog-entity.component";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { SandstormGlobalVariablesService } from "../../shared/sandstorm-global-variables.service";
import { of } from "rxjs";

@Injectable()
export class EntityDataService {
  platformURL = environment.platformURL;
  entityTableHeaders = [
    "Entity Name",
    "Parent Entity Name",
    "Entity Level",
    "Entity Code",
    "Activation Status",
    "Processing Status",
    "Created User",
    "Created Date Time"
  ];
  defaultHeaders: HttpHeaders;
  defaultFilterCriteria = {
    parent: undefined,
    enableFlag: undefined,
    processingStatus: "PENDING_AUTHORIZATION",
    pageSize: 5,
    pageNo: 1
  };
  currentLoggedInUserData = this.globalVariablesService.currentUser;
  menuItemCode: string = "entityManagement";
  constructor(
    public http: HttpClient,
    private dialog: MatDialog,
    private globalVariablesService: SandstormGlobalVariablesService
  ) {
    this.defaultHeaders = new HttpHeaders({
      entityId: "HOO1BOO1",
      tenantId: "T001",
      accessLevel: "0"
    });
  }

  getListOfSubMenuItems() {
    return this.currentLoggedInUserData.role.menuGroup
      .map(menuGroup => menuGroup.menuItems)
      .reduce((menuItemsA, menuItemsB) => menuItemsA.concat(menuItemsB), [])
      .filter(menuItem => menuItem.menuItemCode == "entityManagement")
      .map(menuItem => menuItem.subMenuItems)
      .reduce(
        (subMenuItemsA, subMenuItemsB) => subMenuItemsA.concat(subMenuItemsB),
        []
      )
      .map(subMenuItem => subMenuItem.title);
  }

  getCurrentUserData() {
    return of(this.currentLoggedInUserData);
  }

  getFilteredEntityData(
    parent,
    enableFlag,
    processingStatus,
    pageSize,
    pageNo
  ) {
    return this.http.get(`${this.platformURL}/sandstorm/api/entity`, {
      params: {
        parent: parent,
        enableFlag: enableFlag,
        processingStatus: processingStatus,
        pageSize: pageSize,
        pageNo: pageNo
      }
    });
  }

  getParentEntities() {
    return this.http.get(`${this.platformURL}/sandstorm/api/entity`, {
      params: {
        processingStatus: "AUTHORIZED",
        enableFlag: "1"
      }
    });
  }

  getAllEntities(pageSize, pageNo) {
    return this.http.get(`${this.platformURL}/sandstorm/api/entity`, {
      params: {
        pageSize: pageSize,
        pageNo: pageNo
      }
    });
  }

  getOneEntityData(entityId) {
    return this.http.get(`${this.platformURL}/sandstorm/api/entity`, {
      params: {
        entityCode: entityId
      }
    });
  }

  save(entityData) {
    return this.http.post(
      `${this.platformURL}/sandstorm/api/entity`,
      entityData
    );
  }

  update(entityData) {
    return this.http.put(
      `${this.platformURL}/sandstorm/api/entity/` + entityData.entityCode,
      entityData
    );
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

  getTableHeaders() {
    return this.entityTableHeaders;
  }

  getDefaultFilterCriteria() {
    return this.defaultFilterCriteria;
  }

  getBooleanValue(attribute) {
    if (attribute == "true") {
      attribute = true;
    } else if (attribute == "false") {
      attribute = false;
    }
    return attribute;
  }

  getWorkFlowData(wfInstanceId){
    return this.http.get(`${this.platformURL}/swe/api/event`, {
      params: {
        wfInstanceId: wfInstanceId
      }
    });  }
   

}
