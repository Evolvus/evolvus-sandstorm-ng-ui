
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
  listOfRoles: any  = [];
  listOfApplicationCategory: any;
  defaultFilterCriteria = {
    applicationCode: "",
    activationStatus: "",
    processingStatus: "",
    pageSize: 5,
    pageNo: 1
  } 
  isViewAllOptionSelected: boolean = false;
  noRoleDataMessage: string = "";
  noOfRolesInCurrentPage: number = 0;
  pageSize: number= 5;
  pageNo: number= 1;
  totalNoOfPages: number = 0;
  totalNoOfRoles: number = 0;
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
  this.roleDataService.getAllRoleData(this.pageSize, this.pageNo).
  subscribe((response: any)=>{
      this.listOfRoles = response.data ;
      this.totalNoOfRoles = response.totalNoOfRecords;
      this.totalNoOfPages = response.totalNoOfPages;
      this.setCurrentPage(0);
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

view(role: RoleModel){  
this.router.navigate(['viewRole', role.roleName]);  
}

getRoleDataBasedOnDefaultFilterCriteria(){
  this.listOfRoles = [];
  this.roleDataService.getFilteredRoleData(this.defaultFilterCriteria.applicationCode, this.defaultFilterCriteria.activationStatus, this.defaultFilterCriteria.processingStatus, this.defaultFilterCriteria.pageSize, this.defaultFilterCriteria.pageNo).subscribe((response: any)=>{
  if(response.totalNoOfRecords == 0){
    this.defaultFilterCriteria.processingStatus = "AUTHORIZED";

    this.roleDataService.getFilteredRoleData(this.defaultFilterCriteria.applicationCode, this.defaultFilterCriteria.activationStatus, this.defaultFilterCriteria.processingStatus, this.defaultFilterCriteria.pageSize, this.defaultFilterCriteria.pageNo).subscribe((response: any)=>{
   
        this.listOfRoles = response.data;
        this.totalNoOfRoles = response.totalNoOfRecords;
        this.totalNoOfPages = response.totalNoOfPages;
        this.startIndex = 1;
        this.setCurrentPage(0);
      
    })
  }else{
    this.listOfRoles = response.data;
    this.totalNoOfRoles = response.totalNoOfRecords;
    this.totalNoOfPages = response.totalNoOfPages;
    this.startIndex = 1;
    this.setCurrentPage(0);
  }
  }
  , (err)=>{
    this.roleDataService.openDialog("error", err.error.error).subscribe((result)=>{
      // console.log("Server Down");
    })
  }



  );

}



setCurrentPage(movement: number){ 
  if(movement == 1){ //next page
this.pageNo = this.pageNo + 1;
if(this.isViewAllOptionSelected){
  this.getRoleData();
}else{
  this.getFilteredRoleData();
}
this.startIndex = (this.pageSize * this.startIndex);
  }else if(movement == -1 && this.pageNo > 1){  //prev page 
    this.pageNo = this.pageNo - 1;
    if(this.isViewAllOptionSelected){
      this.getRoleData();
    }else{
      this.getFilteredRoleData();
    }
    this.startIndex = (this.startIndex - this.pageSize+1);
  }else if(movement == 0){//only for pagination purpose
    if(this.listOfRoles.length == this.pageSize){
      this.noOfRolesInCurrentPage = this.pageSize;
    }else{
      this.noOfRolesInCurrentPage = this.totalNoOfRoles;
    }
  }

}


setPageSize(){
  this.pageNo = 1;
  this.startIndex = 1;
  if(this.isViewAllOptionSelected){
    this.getRoleData();
  }else{
    this.getFilteredRoleData();
  }
}


getFilteredRoleData(){
  this.listOfRoles = [];
   
   this.roleDataService.getFilteredRoleData(this.defaultFilterCriteria.applicationCode, this.defaultFilterCriteria.activationStatus, this.defaultFilterCriteria.processingStatus, this.pageSize, this.pageNo )
   .subscribe((response: any)=>{
      this.listOfRoles = response.data;
      this.totalNoOfRoles = response.totalNoOfRecords;
      this.totalNoOfPages = response.totalNoOfPages;
      this.setCurrentPage(0);
   },(err) => {
    this.roleDataService.openDialog("error", err.error.error).subscribe((result)=>{
      
    });

  });

   

}





}