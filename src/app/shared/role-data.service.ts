import { Injectable, OnInit } from '@angular/core';
import { RoleModel } from './role-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
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

platformURL = environment.platformURL;
listOfApplicationCategory: string [] = [];
listOfActivationStatus: string[] = ["Active", "Inactive"];
listOfProcessingStatus: string[] = ["Pending Authorization", "Rejected"];
listOfRoleType: string []=["IT", "Operations", "Audit", "Data Processing"];
listOfConsoleMenus: Object[] = [{menuGroupName: "Administration", listOfMenuItems: ["User Management", "Role Management"]},
{menuGroupName: "Configurations", listOfMenuItems: ["Archival", "Communication"]},
 {menuGroupName: "Maintenance", listOfMenuItems: ["Reason Code Maintenance", "Routing Code Maintenance"]}

];



sampleDate: Date = new Date(); 

role1: RoleModel = {roleName: "Admin-OP",description: "RTP Operations Admin", roleType: "IT",
 applicationCategory:"RTP Operations",activationStatus: "Enabled",
 menuItems: [{}]
};

role2: RoleModel = {roleName: "Checker-OP",description: "RTP Operations Checker", roleType: "Operations",
 applicationCategory:"RTP Operations",activationStatus: "Disabled",
 menuItems: [{}]
};
role3: RoleModel = {roleName: "Maker-OP",description: "RTP Operations Maker", roleType: "Audit",
 applicationCategory:"RTP Operations",activationStatus: "Enabled",  menuItems: [{}]
};


roleData: RoleModel[]=[];


createNewRole(role: RoleModel){
 this.roleData.push(role);
}

getRoleData(){
  return this.roleData.slice();
}

getlistOfApplicationCategory(){
return  this.http.get(`${this.platformURL}/applicationCodes`);
  
}

getListOfRoleType(){
  return  this.http.get(`${this.platformURL}/getAllRoleTypes`);
}

getListOfConsoleMenus(applicationCode: string){
  return this.http.get(`${this.platformURL}/menuItem/find/` + applicationCode);
}

}

