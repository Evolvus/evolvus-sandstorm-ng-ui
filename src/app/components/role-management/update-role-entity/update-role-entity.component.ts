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
        this.addSelectedMenuItems();

      });
   }

  );

    
  }
roleData: RoleModel;
roleForm: FormGroup;  
listOfApplicationCodes: any;
listOfMenuGroups: MenuGroup[];
listOfSelectedMenuGroups: MenuGroup[];





addSelectedMenuItems(){

for(let menuSelGroup of this.listOfSelectedMenuGroups){
  for(let menuLisGroup of this.listOfMenuGroups){
    if(menuSelGroup.menuGroupCode == menuLisGroup.menuGroupCode){
      // console.log(menuLisGroup)
    }
  }
}

}



saveUpdatedRole(){

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
