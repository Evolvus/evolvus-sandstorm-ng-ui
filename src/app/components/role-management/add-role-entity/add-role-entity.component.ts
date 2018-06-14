import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { RoleModel } from '../../../shared/role-model';
import { RoleDataService } from '../../../shared/role-data.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmationDialogEntityComponent } from '../../../shared/confirmation-dialog-entity/confirmation-dialog-entity.component';

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

  listOfApplicationCategory: any;
  listOfRoleType: any;
  listOfConsoleMenus: any;

  activationStatus: string="";
  applicationCategory: string = "";
  roleType: string = "";
  menuItems = [{
    tenantId: "name",
    menuItemType: "quicklink",
    applicationCode: "CDA",
    menuItemCode: "mi4",
    createdBy: "user2",
    title: "menu item4"
  }, {
    tenantId: "name",
    menuItemType: "queues",
    applicationCode: "CDA",
    menuItemCode: "mi5",
    createdBy: "user3",
    title: "menu item5"
  }];

  saveRole(applicationForm: NgForm){
    this.http.post('http://192.168.1.115:8086/saveRole',{
      roleName: applicationForm.form.value.roleName,
      applicationCode: applicationForm.form.value.applicationCategory,
      roleType: applicationForm.form.value.roleType,
      activationStatus: applicationForm.form.value.activationStatus,
      description: applicationForm.form.value.description,
      menuItems: this.menuItems
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
  this.roleDataService.getListOfConsoleMenus(applicationCategory._value).subscribe((response) =>{
this.listOfConsoleMenus = response;
console.log("menuItems", this.listOfConsoleMenus);
  });

}


openDialog(): void {
  let dialogRef = this.dialog.open(ConfirmationDialogEntityComponent, {
    width: '300px',
    data: { message: "Role Successfully Created!" }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
  });
}

  
}
