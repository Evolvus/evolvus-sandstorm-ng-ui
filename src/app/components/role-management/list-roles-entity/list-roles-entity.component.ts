
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
    this.roleDataService.getRoleData().
    subscribe((response)=>{
      console.log(response, "roles");
      this.listOfRoles = response;
    })
    this.roleDataService.getlistOfApplicationCategory().subscribe((response)=>{
      this.listOfApplicationCategory = response;
    })
   
  }

  role: RoleModel;
  listOfRoles: any;
  listOfApplicationCategory: any;
  applicationCategory: string= "Select Application Category";
  activationStatus: string="";
  processingStatus: string ="";
  gridsearch: boolean = false;


  checkBoxTicked(event){
    console.log(event.checked);
  }

viewRole(role: RoleModel){  
this.router.navigate(['viewRole', role.roleName]);  
}

}
