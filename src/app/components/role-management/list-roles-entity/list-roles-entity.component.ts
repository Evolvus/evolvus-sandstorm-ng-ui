
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
  role: RoleModel;
  listOfRoles: any;
  listOfApplicationCategory: any;
  defaultFilterCriteria = {
    applicationCode: "",
    activationStatus: "",
    processingStatus: ""
  } 
  gridsearch: boolean = false;
  isViewAllOptionSelected: boolean = false;
  noRoleDataMessage: string = "";
  selectedPageSize = 5;
  currentPage: number = 1;
  totalNoOfPages: number = 1;
  noOfRoles: number = 0;
  noOfRolesInCurrentPage: number = this.selectedPageSize;
  startIndex: number = 0;

  
  constructor(private roleDataService: RoleDataService, private router: Router) { }

  ngOnInit() {
  this.tableHeader =this.roleDataService.getTableHeaders();
  this.defaultFilterCriteria = this.roleDataService.getDefaultFilterCriteria();
  this.getApplicationCodes();
  this.getRoleDataBasedOnDefaultFilterCriteria();
}


getApplicationCodes(){
  this.roleDataService.getlistOfApplicationCategory().subscribe((response)=>{
    this.listOfApplicationCategory = response;
  });
}


getRoleData(){
  this.roleDataService.getAllRoleData().
  subscribe((roleData: RoleModel[])=>{
    if(roleData != []){
      this.listOfRoles = roleData;
      this.setCurrentPage(0);
    }else{
      this.noRoleDataMessage = "No Roles Found! Use the Add Role button to create a new role!";
    }
  }, (err)=>{
    console.log("getRoleData()", err);
  });
  this.setNoOfRolesInCurrentPage();

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
  this.roleDataService.getFilteredRoleData(this.defaultFilterCriteria.applicationCode, this.defaultFilterCriteria.activationStatus, this.defaultFilterCriteria.processingStatus).subscribe((response: Object[])=>{
  if(response.length == 0){
    this.defaultFilterCriteria.processingStatus = "AUTHORIZED";

    this.roleDataService.getFilteredRoleData(this.defaultFilterCriteria.applicationCode, this.defaultFilterCriteria.activationStatus, this.defaultFilterCriteria.processingStatus).subscribe((response: Object[])=>{
      if(response.length == 0){
        this.noRoleDataMessage = "No Roles Found! Use the Add Role button to create a new role!";
      }else{
        this.listOfRoles = response;
        
      }
    })
  }else{
    this.listOfRoles = response;
    
  }
  this.setCurrentPage(0);
  }
  , (err)=>{
console.log(err, "getRoleDataBasedOnDefaultFilterCriteria()");
  });

}



setCurrentPage(movement: number){ //fired from next and prev button -1 --> back 1--> next
  if(movement===0){ //if movement is 0, only totalNoOfPages attribute value needs to be changed.. 
    this.totalNoOfPages = Math.ceil(this.listOfRoles.length / this.selectedPageSize);
  }else{
  this.getRoleData();
if(movement==1){
  if(this.currentPage<this.totalNoOfPages){
    this.currentPage = this.currentPage + 1;

    this.startIndex = (this.selectedPageSize*(this.currentPage-1));
    
    this.totalNoOfPages = Math.ceil(this.listOfRoles.length / this.selectedPageSize);

    }
}else if(this.currentPage>1 && movement==-1){ //enters only if current page is greater than 1 and movement is 0
  this.currentPage = this.currentPage - 1;
  this.startIndex = (this.selectedPageSize*(this.currentPage-1));
  this.totalNoOfPages = Math.ceil(this.listOfRoles.length / this.selectedPageSize);

}{

}
  }
this.setNoOfRolesInCurrentPage();

}

setNoOfRolesInCurrentPage(){
  this.noOfRolesInCurrentPage = this.currentPage * this.selectedPageSize;
  if(this.noOfRolesInCurrentPage>this.listOfRoles.length){
    this.noOfRolesInCurrentPage = this.listOfRoles.length;
  }
}


getFilteredRoleData(){
  this.roleDataService.getFilteredRoleData(this.defaultFilterCriteria.applicationCode, this.defaultFilterCriteria.activationStatus, this.defaultFilterCriteria.processingStatus)
  .subscribe((response)=>{
    this.listOfRoles = response;
    this.setCurrentPage(0);
  });
  
}





}