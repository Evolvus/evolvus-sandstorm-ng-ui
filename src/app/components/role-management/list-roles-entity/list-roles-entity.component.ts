
import { Router } from '@angular/router';
import { RoleModel } from '../../../shared/role-model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RoleDataService } from '../../../shared/role-data.service';
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
    this.listOfRoles = this.roleDataService.getRoleData();
    this.listOfApplicationCategory = this.roleDataService.getlistOfApplicationCategory();
  }

  role: RoleModel;
  listOfRoles: RoleModel[]=[];
  listOfApplicationCategory: string [] = [];
  applicationCategory: string= "Select Application Category";
activationStatus: string="";
processingStatus: string ="";
gridsearch: boolean = false;


  checkBoxTicked(event){
    console.log(event.checked);
  }

viewRole(role: RoleModel){  
this.router.navigate(['viewRole', role.name]);  
}

}
