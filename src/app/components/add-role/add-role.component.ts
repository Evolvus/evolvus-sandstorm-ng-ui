import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RoleModel } from '../../shared/role-model';
import { RoleDataService } from '../../shared/role-data.service';


@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})

export class AddRoleComponent implements OnInit {

  constructor(private roleDataService: RoleDataService) { }

  ngOnInit() {
    this.listOfApplicationCategory = this.roleDataService.getlistOfApplicationCategory();
    
  }

  listOfApplicationCategory: string [] = [];
  newRole: RoleModel;
  activationStatus: string="";
  applicationCategory: string = "";

  saveRole(applicationForm){

  }
}
