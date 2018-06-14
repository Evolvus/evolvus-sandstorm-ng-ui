import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { RoleModel } from '../../../shared/role-model';
import { RoleDataService } from '../../../shared/role-data.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmationDialogEntityComponent } from '../../../shared/confirmation-dialog-entity/confirmation-dialog-entity.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-add-role-entity',
  templateUrl: './add-role-entity.component.html',
  styleUrls: ['./add-role-entity.component.css']
})

export class AddRoleEntityComponent implements OnInit {

  constructor(private roleDataService: RoleDataService,private router: Router, public dialog: MatDialog, private http: HttpClient) { }

  ngOnInit() {
    this.roleDataService.getlistOfApplicationCategory().subscribe((response)=>{
      this.listOfApplicationCategory = response;
    });
    this.roleDataService.getListOfRoleType().subscribe((response)=>{
      this.listOfRoleType = response;
    });


  }
  platformURL = environment.platformURL;
  listOfApplicationCategory: any;
  listOfRoleType: any;
  listOfConsoleMenus: any;
  applicationCategorySelected: boolean = false;


roleData: RoleModel = {
  activationStatus: "",
  roleName: "",
  roleType: "",
  menuItems: [],
  applicationCategory: "",
  description: ""
};


  saveRole(applicationForm: NgForm){
    console.log("saved role", this.roleData);
    this.http.post(`${this.platformURL}/role`,{
      roleName: this.roleData.roleName,
      applicationCode: this.roleData.applicationCategory,
      roleType: this.roleData.roleType,
      activationStatus: this.roleData.activationStatus,
      description: this.roleData.description,
      menuItems: this.roleData.menuItems
    })
    .subscribe((response)=>{
      console.log(response, "error");
    });
    
    this.openDialog();
    }

  abortSaveAction(){
    this.router.navigate(['/roleManagement']);
}

getMenuItems(applicationCategory){
  this.applicationCategorySelected = true;
  this.roleDataService.getListOfConsoleMenus(applicationCategory._value).subscribe((response) =>{
  this.listOfConsoleMenus = response;
  });
  this.roleData.menuItems = [];
}

addMenuItem(menuItems){
  var tempIndex: number = this.roleData.menuItems.indexOf(menuItems);
  if( tempIndex === -1){
   this.roleData.menuItems.push(menuItems);
   }else{
     this.roleData.menuItems.splice(tempIndex, 1);
   }


}
openDialog(): void {
  let dialogRef = this.dialog.open(ConfirmationDialogEntityComponent, {
    width: '300px',
    data: { message: "Role Successfully Created!" }
  });

  dialogRef.afterClosed().subscribe(result => {
    // console.log(result);
  });
}

  
}
