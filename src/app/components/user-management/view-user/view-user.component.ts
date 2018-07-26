import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from './../user-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

userName: string = "";
selectedUser: any;
isStatusPending: boolean = true;
loggedInUser: any;
listOfSubMenuItems: any = [];
  constructor(private userDataService: UserDataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.userName = "" + this.route.snapshot.params['id'];
    this.userDataService.getOneUserData(this.userName).subscribe((userData: any)=>{



      if(userData.data.length != 0){
        this.selectedUser = userData.data[0];
        if(this.selectedUser.processingStatus!='PENDING_AUTHORIZATION'){
          this.isStatusPending = false;
            }else{
              this.isStatusPending = true;
            }
      }else{ //If there is no data with that Username
        this.userDataService.openDialog("error", "No User found with Username "+this.userName!).subscribe((response)=>{
          this.router.navigate(['userManagement']);
        });
      }
    }, (err)=>{

      alert("No User Data");
    });
    this.userDataService.getCurrentUserData().subscribe((user: any)=>{
      this.loggedInUser = user;   
    });
    this.listOfSubMenuItems = this.userDataService.getListOfSubMenuItems();
  }


  updateUser(){
    if(!this.isStatusPending){
    this.router.navigate(['/updateUser', this.selectedUser.userName]);
    }
    }
  
  abortViewAction(){
    this.router.navigate(['/userManagement']);
      }

      doIExist(title){
        return this.listOfSubMenuItems.includes(title);
        }

}
