import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
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
