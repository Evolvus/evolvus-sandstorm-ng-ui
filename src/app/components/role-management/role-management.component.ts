import { RoleModel } from '../../shared/role-model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RoleDataService } from '../../shared/role-data.service';
import { Pipe } from '@angular/core';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {
  tableHeader:any = [];

  constructor(private roleDataService: RoleDataService) { }

  ngOnInit() {
    this.tableHeader = ['Role Name','Role Description','Application Category','Activation Status','Processing Status','Associated Users','Last Modified Date Time'];
    this.listOfRoles = this.roleDataService.getRoleData();
    this.listOfApplicationCategory = this.roleDataService.getlistOfApplicationCategory();
  }

  role: RoleModel;
  listOfRoles: RoleModel[]=[];
  listOfApplicationCategory: string [] = [];
  applicationCategory: string= "Select Application Category";




  checkBoxTicked(event){
    console.log(event.checked);
  }
}
