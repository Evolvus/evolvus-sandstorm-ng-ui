import { Router } from '@angular/router';
import { AuthenticationService } from './../../login-console/authentication/login/login.service';
import { Component, OnInit } from '@angular/core';
import { SandstormGlobalVariablesService } from '../../shared/sandstorm-global-variables.service';

@Component({
  selector: 'app-starter-header',
  templateUrl: './starter-header.component.html',
  styleUrls: ['./starter-header.component.css']
})
export class StarterHeaderComponent implements OnInit {
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];
  user: any;
  constructor(private authService: AuthenticationService, private globalVariableService: SandstormGlobalVariablesService, private router: Router) { }

  ngOnInit() {
    this.user = this.globalVariableService.currentUser.getValue();
  }

  sideBarmenu(){
  //  console.log(this.body.classList.toggle;
    this.body.classList.toggle('sidebar-collapse');
  }

  viewProfile(){
    this.router.navigate(["viewUser", this.user.userId]);
  }


logout(){
  this.authService.logout();
}




}