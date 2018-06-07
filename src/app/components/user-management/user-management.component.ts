import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  userTableHeader:any = [];
  constructor() { }

  ngOnInit() {
    this.userTableHeader = ['User Id','User Name','User Role','Enable/Disable','Active/Inactive','Status','Last Action on User','Last Modified Date Time'];
  }
  gridsearch: boolean = false;

}
