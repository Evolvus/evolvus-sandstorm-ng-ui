
import { Router } from '@angular/router';
import { RoleModel } from '../role-model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RoleDataService } from '../role-data.service';
import { Pipe } from '@angular/core';


@Component({
  selector: 'app-list-roles-entity',
  templateUrl: './list-roles-entity.component.html',
  styleUrls: ['./list-roles-entity.component.css']
})
export class ListRolesEntityComponent implements OnInit {
  tableHeader:any = [];

  constructor(private roleDataService: RoleDataService, private router: Router) { }

  ngOnInit() {
    this.tableHeader = ['Role Name','Role Description','Application Category','Activation Status','Processing Status','Associated Users','Last Modified Date Time'];
  
  this.getApplicationCodes();
  this.getRoleData();
  this.getRoleDataBasedOnDefaultFilterCriteria();
}

  role: RoleModel;
  listOfRoles: any;
  listOfApplicationCategory: any;
  applicationCode: string;
  activationStatus: string;
  processingStatus: string = "unauthorized";
  gridsearch: boolean = false;
  isViewAllOptionSelected: boolean = false;
  noRoleDataMessage: string = "";

getApplicationCodes(){
  this.roleDataService.getlistOfApplicationCategory().subscribe((response)=>{
    this.listOfApplicationCategory = response;
  });
}


getRoleData(){
  this.roleDataService.getAllRoleData().
  subscribe((response)=>{
    console.log(response, "roles");
    this.listOfRoles = response;
  });
}

  checkBoxTicked(status){
this.isViewAllOptionSelected = !this.isViewAllOptionSelected;
if(this.isViewAllOptionSelected){
  this.getRoleData();
}else{
  this.getFilteredRoleData(this.applicationCode, this.activationStatus, this.processingStatus);
}
  }

viewRole(role: RoleModel){  
this.router.navigate(['viewRole', role.roleName]);  
}

getRoleDataBasedOnDefaultFilterCriteria(){
  this.listOfRoles = [];
  this.roleDataService.getFilteredRoleData(this.applicationCode, this.activationStatus, this.processingStatus).subscribe((response: Object[])=>{
  if(response.length == 0){
    this.processingStatus = "authorized";
    this.roleDataService.getFilteredRoleData(this.applicationCode, this.activationStatus, this.processingStatus).subscribe((response: Object[])=>{
      if(response.length == 0){
        this.noRoleDataMessage = "No Roles Found! Use the Add Role button to create a new role!";
      }else{
        this.listOfRoles = response;
      }
    })
  }else{
    this.listOfRoles = response;
  }
  })
}

getFilteredRoleData(applicationCode,activationStatus, processingStatus){
console.log(applicationCode,activationStatus, processingStatus);
  this.roleDataService.getFilteredRoleData(applicationCode,activationStatus, processingStatus)
  .subscribe((response)=>{
    this.listOfRoles = response;
  });
}


}
