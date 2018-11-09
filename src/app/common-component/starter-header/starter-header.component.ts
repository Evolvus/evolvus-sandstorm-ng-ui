import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../login-console/authentication/login/login.service';
import { Component, OnInit } from '@angular/core';
import { SandstormGlobalVariablesService } from '../../shared/sandstorm-global-variables.service';
import { environment } from '../../../environments/environment';
  
@Component({
  selector: 'app-starter-header',
  templateUrl: './starter-header.component.html',
  styleUrls: ['./starter-header.component.css']
})
export class StarterHeaderComponent implements OnInit {
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];
  user: any;
  loggingOut: boolean = false;
  platformURL = environment.platformURL;
  listOfApplications: any[]=[];
  application: any; 

  constructor(private http: HttpClient,private authService: AuthenticationService, private globalVariableService: SandstormGlobalVariablesService, private router: Router) { }

  ngOnInit() {

    this.user = this.globalVariableService.currentUser.getValue();

this.getApplicationData().subscribe((response: any)=>{
  response.data.map((application)=>{
    if(application.applicationName!='SANDSTORM'){
      this.listOfApplications.push(application);
    }
  })
})
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


getApplicationData(){
  return this.http.get(`${this.platformURL}/sandstorm/api/application`);
  }


  navToApp(application){  
     
    window.open(`${application.url}`);  
         
   }    
   
}