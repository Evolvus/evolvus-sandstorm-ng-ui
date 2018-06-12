import { Injectable, OnInit } from '@angular/core';
import { RoleModel } from './role-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleDataService {

  constructor(private http: HttpClient) {
    this.ngOnInit();
   }



ngOnInit(){

  this.roleData.push(this.role1);
  this.roleData.push(this.role2);
  this.roleData.push(this.role3);
  this.roleData.push(this.role1);
  this.roleData.push(this.role2);
  this.roleData.push(this.role3);
}


listOfApplicationCategory: string [] = ["Flux-CDA Console", "Flux-CDA Operations", "Flux-RTP Console", "Flux-RTP Operations"];
listOfActivationStatus: string[] = ["Active", "Inactive"];
listOfProcessingStatus: string[] = ["Pending Authorization", "Rejected"];
listOfRoleType: string []=["IT", "Operations", "Audit", "Data Processing"];
listOfConsoleMenus: Object[] = [{menuGroupName: "Administration", listOfMenuItems: ["User Management", "Role Management"]},
{menuGroupName: "Configurations", listOfMenuItems: ["Archival", "Communication"]},
 {menuGroupName: "Maintenance", listOfMenuItems: ["Reason Code Maintenance", "Routing Code Maintenance"]}

];



sampleDate: Date = new Date(); 

role1: RoleModel = {name: "Admin-OP",description: "RTP Operations Admin", roleType: "IT",
 applicationCategory:"RTP Operations",activationStatus: "Enabled", processingStatus: "Authorized",
 associatedUsers:5, lastModifiedTime: this.sampleDate
};

role2: RoleModel = {name: "Checker-OP",description: "RTP Operations Checker", roleType: "Operations",
 applicationCategory:"RTP Operations",activationStatus: "Disabled", processingStatus: "Unauthorized",
 associatedUsers:3, lastModifiedTime: this.sampleDate
};
role3: RoleModel = {name: "Maker-OP",description: "RTP Operations Maker", roleType: "Audit",
 applicationCategory:"RTP Operations",activationStatus: "Enabled", processingStatus: "Unauthorized",
 associatedUsers:2, lastModifiedTime: this.sampleDate
};


roleData: RoleModel[]=[];


createNewRole(role: RoleModel){
 this.roleData.push(role);
}

getRoleData(){
  return this.roleData.slice();
}

getlistOfApplicationCategory(){
  return this.listOfApplicationCategory.slice();
}

getListOfRoleType(){
return this.listOfRoleType.slice();
}

getListOfConsoleMenus(){
return this.listOfConsoleMenus.slice();
}

}

