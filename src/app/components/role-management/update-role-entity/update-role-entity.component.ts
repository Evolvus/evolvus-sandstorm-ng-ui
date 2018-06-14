import { RoleModel } from './../../../shared/role-model';
import { Component, OnInit } from '@angular/core';
RoleModel
@Component({
  selector: 'app-update-role-entity',
  templateUrl: './update-role-entity.component.html',
  styleUrls: ['./update-role-entity.component.css']
})
export class UpdateRoleEntityComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }
listOfApplicationCategory: any;

roleData: RoleModel =  {roleName: "",
description: "string",
applicationCategory: "string",
roleType: "string",
activationStatus: "string",
menuItems: []};



}
