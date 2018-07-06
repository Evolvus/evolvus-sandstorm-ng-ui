import { UserModel } from './../user-model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserDataService } from './../user-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  userTableHeaders: string[] = [];
  isViewAllOptionSelected: boolean = false;
  defaultFilterCriteria = {  
  userLoginStatus: "",
  activationStatus: "",
  processingStatus: "",
  pageSize: 5,
  pageNo: 1
};
noUserDataMessage: string = "";
listOfUsers: UserModel[];
startIndex: number =  0;
noOfUsersInCurrentPage: number = 0;
totalNoOfUsers: number = 0;
pageSize: number = 5;
pageNo: number = 1;
totalNoOfPages: number = 0;
  constructor(private userDataService: UserDataService, private router: Router) { }

  ngOnInit() {
    this.userTableHeaders = this.userDataService.getTableHeaders();
    this.defaultFilterCriteria = this.userDataService.getDefaultFilterCriteria();  
  }


  getFilteredUserData(){

  }

  view(user){

  }

  checkBoxTicked(value){
    this.isViewAllOptionSelected = !this.isViewAllOptionSelected;
    // if(value){
    //   this.getRoleData();
    // }else{
    //   this.getFilteredRoleData();
    // }
      }

routeToAdd(){
  this.router.navigate(['addUser']);

}

}
