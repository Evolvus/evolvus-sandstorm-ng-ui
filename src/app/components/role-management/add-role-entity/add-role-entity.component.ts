import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  NgForm,
  FormArray,
  Validators
} from "@angular/forms";
import { RoleModel } from "../role-model";
import { MenuGroup } from "../role-model";
import { MenuItems } from "../role-model";
import { RoleDataService } from "../role-data.service";
import { Router } from "@angular/router";
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
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.roleForm = new FormGroup({
      activationStatus: new FormControl(null, Validators.required),
      roleName: new FormControl(null, Validators.required),
      applicationCode: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
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
  menuGroupNotSelected: boolean;

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
  }

  addMenuItem(menuGroupFromUser, menuItemFromUser) {
    menuItemFromUser.selectedFlag = !menuItemFromUser.selectedFlag;
  }



  saveRole() {
    for (var mgIndex = 0; mgIndex < this.listOfMenuGroups.length; mgIndex++) {
      this.menuGroupNotSelected = true;
      for (
        var miIndex = 0;
        miIndex < this.listOfMenuGroups[mgIndex].menuItems.length;
        miIndex++
      ) {
        if (!this.listOfMenuGroups[mgIndex].menuItems[miIndex].selectedFlag) {
          this.listOfMenuGroups[mgIndex].menuItems.splice(miIndex, 1);
          --miIndex;
        } else {
          this.menuGroupNotSelected = false;
        }
      }
      if (this.menuGroupNotSelected) {
        this.listOfMenuGroups.splice(mgIndex, 1);
        --mgIndex;
      }
    }

    var roleData = {
      roleName: this.roleForm.value.roleName,
      applicationCode: this.roleForm.value.applicationCode,
      activationStatus: this.roleForm.value.activationStatus,
      description: this.roleForm.value.description,
      menuGroup: this.listOfMenuGroups
    };

    this.roleDataService.saveRole(roleData).subscribe(
      data => {

        this.roleDataService.openDialog(
          "success",
          roleData.roleName + "\xa0Role Saved Successfully!"
        );
      },
      err => {
        console.log(err);
        this.roleDataService.openDialog("error", err.error.message);
      }
    );
  }
}
