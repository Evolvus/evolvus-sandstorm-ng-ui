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

roleData: RoleModel =  {roleName: "",
description: "string",
applicationCategory: "string",
roleType: "sring",
activationStatus: "string",
processingStatus: "string",
associatedUsers: null,
lastModifiedTime:  new Date(),
menuItems: []};



}
