import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  userTableHeader:any = [];

  logins = [
    {value: 'login', viewValue: 'Logged-In'},
    {value: 'logout', viewValue: 'Logged-Out'}
    
  ];

  activationstatus = [
    {value: 'active', viewValue: 'Active'},
    {value: 'Inactive', viewValue: 'InActive'}
    
  ];

  processingstatus = [
    {value: 'pending', viewValue: 'Pending Authorization'},
    {value: 'authorized', viewValue: 'Authorized'},
    {value: 'reject', viewValue: 'Rejected'}
    
  ];

  constructor() { }

  ngOnInit() {
    this.userTableHeader = ['User Id','User Name','User Role','Designation','Phone Number','Mobile Number','Country','City'];
  }
  gridsearch: boolean = false;

}
