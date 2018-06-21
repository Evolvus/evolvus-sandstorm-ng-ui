import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, NgForm, FormArray, Validators } from "@angular/forms";
import { RoleModel } from "../role-model";
import { MenuGroup } from "../role-model";
import { MenuItems } from "../role-model";
import { RoleDataService } from "../role-data.service";
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ConfirmationDialogEntityComponent } from "../../../shared/confirmation-dialog-entity/confirmation-dialog-entity.component";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-add-role-entity",
  templateUrl: "./add-role-entity.component.html",
  styleUrls: ["./add-role-entity.component.css"]
})

export class AddRoleEntityComponent implements OnInit {
  constructor(
    private roleDataService: RoleDataService,
    private router: Router,
    public dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.roleForm = new FormGroup({
      activationStatus: new FormControl(null, Validators.required),
      roleName: new FormControl(null, Validators.required),
      applicationCode: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),

    });

   

    this.roleDataService
      .getlistOfApplicationCategory()
      .subscribe((response: string[]) => {
        this.listOfApplicationCategory = response;
      });
  }


  platformURL = environment.platformURL;
  listOfApplicationCategory: string[];
  listOfMenuGroups: MenuGroup[];
  applicationCategorySelected: boolean = false;
  roleForm: FormGroup;

  roleData: RoleModel = {
    activationStatus: "",
    roleName: "",
    menuGroup: [],
    applicationCode: "",
    description: ""
  };


  abortSaveAction() {
    this.router.navigate(["/roleManagement"]);
  }

  getMenuGroups(applicationCode) {
    this.applicationCategorySelected = true;
    this.roleDataService
      .getListOfMenuGroups(applicationCode)
      .subscribe((response: MenuGroup[]) => {
        this.listOfMenuGroups = response;
      });
      console.log(applicationCode);
  }

  addMenuItem(menuGroupFromUser, menuItemFromUser) {
menuItemFromUser.selectedFlag = !menuItemFromUser.selectedFlag;
  }

  openDialog(messageType, statusMessage): void {
    let dialogRef = this.dialog.open(ConfirmationDialogEntityComponent, {
      width: "300px",
      data: { message: statusMessage,
      type: messageType }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
    });
  }

  saveRole() {

for(let tempMenuGroup of this.listOfMenuGroups){
  for(var i = 0; i<tempMenuGroup.menuItems.length; i++){
if(!tempMenuGroup.menuItems[i].selectedFlag){
tempMenuGroup.menuItems.splice(i, 1);
--i;
}
  }
}

var roleData = {
  roleName: this.roleForm.value.roleName,
  applicationCode: this.roleForm.value.applicationCode,
  activationStatus: this.roleForm.value.activationStatus,
  description: this.roleForm.value.description,
  menuGroup: this.listOfMenuGroups
};

this.roleDataService.saveRole(roleData).subscribe(data=>{
this.openDialog("success", roleData.roleName+"\xa0Role Saved Successfully!");
},err=>{
  console.log(err);
  this.openDialog("error", err.error.message);
});





}
}
