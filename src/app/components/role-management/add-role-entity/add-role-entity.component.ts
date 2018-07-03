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
import { min, max } from "rxjs/operators";

@Component({
  selector: "app-add-role-entity",
  templateUrl: "./add-role-entity.component.html",
  styleUrls: ["./add-role-entity.component.css"]
})
export class AddRoleEntityComponent implements OnInit {



  listOfApplicationCategory: string[];
  listOfMenuGroups: MenuGroup[];
  applicationCategorySelected: boolean = false;
  roleForm: FormGroup;
  menuGroupNotSelected: boolean;




  constructor(
    private roleDataService: RoleDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.roleForm = new FormGroup({
      activationStatus: new FormControl('', Validators.required),
      roleName: new FormControl('', [Validators.pattern("[a-zA-Z0-9_-]*"), Validators.pattern(/^\S*$/), Validators.minLength(6), Validators.maxLength(35), Validators.required]),
      applicationCode: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(140)])
    });

    this.roleDataService
      .getlistOfApplicationCategory()
      .subscribe((response: string[]) => {
        this.listOfApplicationCategory = response;
      });
  }



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



  save() {
    for (var mgIndex = 0; mgIndex < this.listOfMenuGroups.length; mgIndex++) {
      this.menuGroupNotSelected = true;
      for (
        var miIndex = 0;
        miIndex < this.listOfMenuGroups[mgIndex].menuItems.length;miIndex++
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

    this.roleDataService.save(roleData).subscribe(
      (data: {savedRoleObject: Object, message: string}) => {
       this.roleDataService.openDialog(
          "success",
         data.message
        ).subscribe((result)=>{
        this.router.navigate(['roleManagement']);
        });
   
      },
      (err) => {
        this.roleDataService.openDialog("error", err.error.error).subscribe((result)=>{
          this.getMenuGroups(this.roleForm.value.applicationCode);
        })
      }
    );
  }
}
