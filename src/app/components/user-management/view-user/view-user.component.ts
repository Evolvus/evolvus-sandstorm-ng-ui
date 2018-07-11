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
  constructor(private userDataService: UserDataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.userName = "" + this.route.snapshot.params['id'];
    this.userDataService.getOneUserData(this.userName).subscribe((userData: any)=>{

      this.selectedUser = userData.data[0];
    }, (err)=>{

      alert("No User Data");
    })
  }


  updateUser(){
    this.router.navigate(['/updateUser', this.selectedUser.userName]);
    }
  
  abortViewAction(){
    this.router.navigate(['/userManagement']);
      }


}
