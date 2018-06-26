
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
  // this.getRoleData();
  this.getRoleDataBasedOnDefaultFilterCriteria();
}

  role: RoleModel;
  listOfRoles: any;
  listOfApplicationCategory: any;
  applicationCode: string;
  activationStatus: string;
  processingStatus: string = "PENDING_AUTHORIZATION";
  gridsearch: boolean = false;
  isViewAllOptionSelected: boolean = false;
  noRoleDataMessage: string = "";
  selectedPageSize: number = 5;
  currentPage: number = 1;
  totalNoOfPages: number = 1;
  noOfRoles: number = 0;
  noOfRolesInCurrentPage: number = 0;

getApplicationCodes(){
  this.roleDataService.getlistOfApplicationCategory().subscribe((response)=>{
    this.listOfApplicationCategory = response;
  });
}


getRoleData(){
  this.roleDataService.getAllRoleData().
  subscribe((roleData: RoleModel[])=>{
    this.listOfRoles = roleData;
    if(roleData != []){
      this.getTableStructure();
    }else{
      this.noRoleDataMessage = "No Roles Found! Use the Add Role button to create a new role!";
    }
  }, (err)=>{
    console.log("getRoleData()", err);
  });
}

  checkBoxTicked(value){
this.isViewAllOptionSelected = !this.isViewAllOptionSelected;
if(value){
  this.getRoleData();
}else{
  this.getFilteredRoleData();
}
  }

viewRole(role: RoleModel){  
this.router.navigate(['viewRole', role.roleName]);  
}

getRoleDataBasedOnDefaultFilterCriteria(){
  this.listOfRoles = [];
  this.roleDataService.getFilteredRoleData(this.applicationCode, this.activationStatus, this.processingStatus).subscribe((response: Object[])=>{
  if(response.length == 0){
    this.processingStatus = "AUTHORIZED";
    this.roleDataService.getFilteredRoleData(this.applicationCode, this.activationStatus, this.processingStatus).subscribe((response: Object[])=>{
      if(response.length == 0){
        this.noRoleDataMessage = "No Roles Found! Use the Add Role button to create a new role!";
      }else{
        this.listOfRoles = response;
        this.getTableStructure();

      }
    })
  }else{
    this.listOfRoles = response;
    this.getTableStructure();

  }
  }, (err)=>{
console.log(err, "getRoleDataBasedOnDefaultFilterCriteria()");
  });
}

getFilteredRoleData(){
  this.roleDataService.getFilteredRoleData(this.applicationCode, this.activationStatus, this.processingStatus)
  .subscribe((response)=>{
    this.listOfRoles = response;
  });
}


getTableStructure(){
this.noOfRoles = this.listOfRoles.length;
if(this.noOfRoles==0){
  this.noOfRolesInCurrentPage = 0;
  this.totalNoOfPages = 0;
}else if(this.noOfRoles<=this.selectedPageSize){
  this.noOfRolesInCurrentPage = this.noOfRoles;
  this.totalNoOfPages = 1;
}else{
  this.totalNoOfPages = Math.ceil(this.noOfRoles/this.selectedPageSize);
}
}

}
