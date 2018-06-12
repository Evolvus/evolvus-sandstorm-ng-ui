import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RoleModel } from '../../../shared/role-model';
import { RoleDataService } from '../../../shared/role-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-role-entity',
  templateUrl: './add-role-entity.component.html',
  styleUrls: ['./add-role-entity.component.css']
})

export class AddRoleEntityComponent implements OnInit {

  constructor(private roleDataService: RoleDataService,private router: Router) { }

  ngOnInit() {
    this.listOfApplicationCategory = this.roleDataService.getlistOfApplicationCategory();
    this.listOfRoleType = this.roleDataService.getListOfRoleType();
    this.listOfConsoleMenus = this.roleDataService.getListOfConsoleMenus();
  }

  listOfApplicationCategory: string [] = [];
  listOfRoleType: string [] = [];
  listOfConsoleMenus: Object [] = [];

  newRole: RoleModel;
  activationStatus: string="";
  applicationCategory: string = "";
  roleType: string = "";


  saveRole(applicationForm){
console.log(applicationForm);

  }

  abortSaveAction(){
    this.router.navigate(['/roleManagement']);
}

  
}
