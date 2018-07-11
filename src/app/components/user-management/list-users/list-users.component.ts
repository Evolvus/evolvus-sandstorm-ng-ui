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
  processingStatus: "PENDING_AUTHORIZATION",
  pageSize: 5,
  pageNo: 1
};
noUserDataMessage: string = "";
listOfUsers: UserModel[] = [];
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
    this.defaultFilterCriteria.processingStatus="PENDING_AUTHORIZATION";
    console.log(this.defaultFilterCriteria, "defaultCriteria"); 
    this.getUserDataBasedOnDefaultFilterCriteria();
  }


  getUserDataBasedOnDefaultFilterCriteria(){
    this.listOfUsers = [];
    this.userDataService.getFilteredUserData(this.defaultFilterCriteria.userLoginStatus, this.defaultFilterCriteria.activationStatus, this.defaultFilterCriteria.processingStatus,this.defaultFilterCriteria.pageSize, this.defaultFilterCriteria.pageNo).subscribe((response: any )=>{
      console.log("response if", response);
    if(response.totalNoOfRecords==0){

      this.defaultFilterCriteria.processingStatus = "AUTHORIZED";
  
      this.userDataService.getFilteredUserData(this.defaultFilterCriteria.userLoginStatus, this.defaultFilterCriteria.activationStatus, this.defaultFilterCriteria.processingStatus,this.defaultFilterCriteria.pageSize, this.defaultFilterCriteria.pageNo).subscribe((response: any)=>{
        console.log("response else", response);

          this.listOfUsers = response.data;
          this.totalNoOfUsers = response.totalNoOfRecords;
          this.totalNoOfPages = response.totalNoOfPages;
          this.startIndex = 1;
          this.setCurrentPage(0);
      }, (err)=>{
        this.noUserDataMessage = "Server Error! Try Again Later!";
      })
    }else{
      this.listOfUsers = response.data;
      this.totalNoOfUsers = response.totalNoOfRecords;
      this.totalNoOfPages = response.totalNoOfPages;
      this.startIndex = 1;
          this.setCurrentPage(0);
    }
    }
    , (err)=>{

      this.userDataService.openDialog("error", err.error.error).subscribe((result)=>{
        // console.log("Server Down");
      });    });
  }

  view(user){
    this.router.navigate(['viewUser', user.userName]);  

  }

  getFilteredUserData(source){
    if(source=='filter'){
      this.pageNo = 1;
      this.startIndex = 1;
    }
    this.listOfUsers = [];
    this.userDataService.getFilteredUserData(this.defaultFilterCriteria.userLoginStatus, this.defaultFilterCriteria.activationStatus, this.defaultFilterCriteria.processingStatus,this.pageSize, this.pageNo)
    .subscribe((response: any)=>{
        this.listOfUsers = response.data;
        this.totalNoOfUsers = response.totalNoOfRecords;
        this.totalNoOfPages = response.totalNoOfPages;
        this.setCurrentPage(0);
    });
    
  }

  getAllUserData(){
    this.userDataService.getAllUserData(this.pageSize, this.pageNo).
    subscribe((response: any)=>{
        this.listOfUsers = response.data;
        this.totalNoOfUsers = response.totalNoOfRecords;
        this.totalNoOfPages = response.totalNoOfPages;
        this.setCurrentPage(0);
    }, (err)=>{
      this.noUserDataMessage = "Server Error! Try Again Later!";
    });
  }



  checkBoxTicked(value){
    this.isViewAllOptionSelected = !this.isViewAllOptionSelected;
    if(value){
      this.getAllUserData();
    }else{
      this.getFilteredUserData("");
    }
    
      }

routeToAdd(){
  this.router.navigate(['addUser']);
}

setCurrentPage(movement: number){ 
         
  if(movement == 1){ //next page
this.pageNo = this.pageNo + 1;
if(this.isViewAllOptionSelected){
  this.getAllUserData();
}else{
  this.getFilteredUserData("");
}
this.startIndex = (this.pageSize * this.startIndex);
  }else if(movement == -1 && this.pageNo > 1){  //prev page 
    this.pageNo = this.pageNo - 1;
    if(this.isViewAllOptionSelected){
      this.getAllUserData();
    }else{
      this.getFilteredUserData("");
    }
    this.startIndex = (this.startIndex - this.pageSize+1);
  }else if(movement == 0){    
    //only for pagination purpose
    // if(this.listOfEntities.length == 0){
    //   // this.startIndex = 0;
    //   this.pageNo = 0;
    // }
    if(this.listOfUsers.length == this.pageSize){
    
      this.noOfUsersInCurrentPage = this.pageSize;
    }else{
      this.noOfUsersInCurrentPage = this.totalNoOfUsers;
    }
  }

}



}
