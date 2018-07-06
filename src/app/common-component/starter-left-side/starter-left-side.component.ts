import { AuthenticationService } from './../../login-console/authentication/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starter-left-side',
  templateUrl: './starter-left-side.component.html',
  styleUrls: ['./starter-left-side.component.css']
})
export class StarterLeftSideComponent implements OnInit {

userMenuGroups: any;

  constructor(private router:Router, private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.userData.subscribe((userData)=>{
this.userMenuGroups = userData.data.role.menuGroup;
    });
  }

  routing(){
this.router.navigate(['roleManagement']);
  }

}
