import { RoleModel } from '../role-model';
import { Component, OnInit } from '@angular/core';
import { RoleDataService } from "../role-data.service";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MenuGroup } from "../role-model";
import { MenuItems } from "../role-model";
import {
  FormGroup,
  FormControl,
  NgForm,
  FormArray,
  Validators
} from "@angular/forms";

RoleModel
@Component({
  selector: 'app-update-role-entity',
  templateUrl: './update-role-entity.component.html',
  styleUrls: ['./update-role-entity.component.css']
})
export class UpdateRoleEntityComponent implements OnInit {

  constructor(private roleDataService: RoleDataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.roleDataService
    .getlistOfApplicationCategory()
    .subscribe((response: string[]) => {
      this.listOfApplicationCodes = response;
    });

    this.roleForm = new FormGroup({
      activationStatus: new FormControl(null, Validators.required),
      roleName: new FormControl(null, Validators.required),
      applicationCode: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });

    var roleName = this.route.snapshot.params['id'];

    this.roleDataService.getOneRoleData(roleName)
     .subscribe((response: RoleModel)=>{
      this.roleData = response;
      this.listOfSelectedMenuGroups = this.roleData.menuGroup;
      this.addSelectedMenuItemCodes();
      this.roleForm.patchValue({
        activationStatus: response.activationStatus,
        roleName: response.roleName,
        applicationCode: response.applicationCode,
        description: response.description,
      });
      this.roleDataService
      .getListOfMenuGroups(response.applicationCode)
      .subscribe((response: MenuGroup[]) => {
        this.listOfMenuGroups = response;
      });
   }

  );

    
  }
roleData: RoleModel;
roleForm: FormGroup;  
listOfApplicationCodes: any;
listOfMenuGroups: MenuGroup[];
listOfSelectedMenuGroups: MenuGroup[];
listOfMenuItemCodes: string[] = [];
menuGroupNotSelected = false;

menuItemsChanged = false;
 // we have used two attributes of mat-checkbox in html. (change) and [checked].. 
 //[checked] is used in order to check the boxes of already selected Menu Items while loading
 //(change) is used to update any changes to the checkbox after loading...
 // But when there are any changes to made to the checkbox, both the attributes are triggered..
 // Both attributes call two different functions with different logic which will create conflicts..
 // Hence 'menuItemsChanged' is used to in order to avoid conflicts..
 
addSelectedMenuItemCodes(){   
//All the MenuItemCodes of selected MenuItems of the selected Role is added to a list for UI representation during loading..
  for(let menuGroup of this.listOfSelectedMenuGroups){
    for(let menuItem of menuGroup.menuItems){
      this.listOfMenuItemCodes.push(menuItem.menuItemCode);
    }
  }
}



getMenuGroups(applicationCode) {
  console.log(applicationCode);
  this.roleDataService
    .getListOfMenuGroups(applicationCode)
    .subscribe((response: MenuGroup[]) => {
      this.listOfMenuGroups = response;
      console.log("get list", response);
    });
}

addMenuItem(menuGroup, menuItem) {

this.menuItemsChanged = true;
if(menuItem.selectedFlag){
  menuItem.selectedFlag = false;
}else{
  menuItem.selectedFlag = true;
}

}

saveUpdatedRole(){


    for (var mgIndex = 0; mgIndex < this.listOfMenuGroups.length; mgIndex++) {
      this.menuGroupNotSelected = true;
      for (var miIndex = 0; miIndex < this.listOfMenuGroups[mgIndex].menuItems.length; miIndex++) {
        if (!this.listOfMenuGroups[mgIndex].menuItems[miIndex].selectedFlag) {
          this.listOfMenuGroups[mgIndex].menuItems.splice(miIndex, 1);
          --miIndex;
          this.menuGroupNotSelected = true;

        } else {
          this.menuGroupNotSelected = false;
        }
      }
      if (this.menuGroupNotSelected) {
        this.listOfMenuGroups.splice(mgIndex, 1);
        --mgIndex;
      }
    }


      this.roleData.roleName = this.roleForm.value.roleName,
      this.roleData.applicationCode = this.roleForm.value.applicationCode,
      this.roleData.activationStatus = this.roleForm.value.activationStatus,
      this.roleData.description = this.roleForm.value.description,
      this.roleData.menuGroup = this.listOfMenuGroups
  

    this.roleDataService.updateRole(this.roleData).subscribe(
      data => {

        this.roleDataService.openDialog(
          "success",
          this.roleData.roleName + "\xa0Role Saved Successfully!"
        );
      },
      err => {
        this.roleDataService.openDialog("error", err.error.message);
      }
    );
  
}


checkIfMenuItemIsSelected(menuItem): boolean{
if(!this.menuItemsChanged){
  if(this.listOfMenuItemCodes.includes(menuItem.menuItemCode)){
 menuItem.selectedFlag = true;
 return true;
  }
}else{
  return menuItem.selectedFlag;
}
}

abortSaveAction(){
  var tempStatus = "";
  if(this.roleForm.touched){
    tempStatus = this.roleDataService.openDialog("alert", "All the changes will be discarded, click OK to continue!");
    if(tempStatus === "success"){
      this.router.navigate(['viewRole', this.roleData.roleName]);  
    }
  }else{
    this.router.navigate(['viewRole', this.roleData.roleName]);  
  }
  

}
}
