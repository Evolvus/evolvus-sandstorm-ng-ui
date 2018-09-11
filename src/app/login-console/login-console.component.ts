import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import {Component, OnInit,Inject, ViewChild, ElementRef} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { AuthenticationService } from './authentication/login/login.service';
import { Authentication } from "../models/authentication.model";
import { SandstormGlobalVariablesService } from './../shared/sandstorm-global-variables.service';
import { UserDataService } from '../components/user-management/user-data.service';
import { animationFrameScheduler } from 'rxjs';

@Component({
  selector: 'app-login-console',
  templateUrl: './login-console.component.html',
  styleUrls: ['./login-console.component.css'],


})
export class LoginConsoleComponent implements OnInit {

  usernameShow: boolean = true;
  userpasswordShow: boolean = false;
  loginForm: FormGroup; 
  dateFormat:string;
  loginErrorMessage: string = "";
  isUserAuthenticated = false;
  viewUserNameComponent: boolean = true;
  viewPasswordComponent: boolean = false;
  color = 'primary';
  mode = 'indeterminate';
  value = 25;
eyeOpen = false;
passwordType: string = "password";
doesUserExists: boolean = false;
isInternetAvailable: boolean = navigator.onLine;
emitMe = new BehaviorSubject<number>(5);
loggedInUser = {};
user = new BehaviorSubject<any>(this.loggedInUser);
transitionToPasswordPage: boolean = false;

  constructor(el: ElementRef, private authenticationService : AuthenticationService, private router : Router, private globalVariableService: SandstormGlobalVariablesService, private userDataService: UserDataService

     ) {


     }

  ngOnInit() {
      this.loginForm = new FormGroup({
          userName: new FormControl('', [Validators.required, Validators.minLength(6)], ),
          userPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
      });

      window.setInterval(()=>{
        if(!navigator.onLine){
         this.isInternetAvailable = false;
        }
      }, 1500);




    }
 



  login() {
      
    if(!this.loginForm.invalid){
      this.loginForm.setErrors(null);
      const userName = this.loginForm.value.userName;
      const userPassword = this.loginForm.value.userPassword;
      const authentication = new Authentication(userName, userPassword, "SANDSTORM");
      this.authenticationService.authenticate(authentication).subscribe((user : any) => {
          if (user != null) {
            this.isUserAuthenticated = true;
            setTimeout(()=>{
                this.authenticationService.isAuthenticated = true;
                this.authenticationService.authenticatedSubject.next(this.authenticationService.isAuthenticated);
                this.authenticationService.setToken(user.token);
                this.authenticationService.dtFormat = 'dd/MM/yyyy hh:mm:ss';
                this.dateFormat =this.authenticationService.dtFormat;
                // this.globalVariableService.currentUser = user.data;
                this.globalVariableService.currentUser.next(user.data);

                
                this.router.navigate(['home']);

            }, 1000);    
          }else{
            this.router.navigate(['login']);
          }
      }, err => {

          if(err.statusText === "Unauthorized"){
      this.loginErrorMessage = "*UserName / Password doesn't match!";
          }else{
            this.loginErrorMessage = "*Server Error, Try Again!";
          }
          this.authenticationService.isAuthenticated = false;
          this.authenticationService.authenticatedSubject.next(this.authenticationService.isAuthenticated);

          this.loginForm.reset();
          this.viewPasswordComponent = false;
          this.viewUserNameComponent = true;
          this.router.navigate(["login"]);

      });
    }else{
      this.loginForm.controls['userPassword'].setErrors({'incorrect' : true});
    }   
  }




  changeView(){


 
if(!this.loginForm.controls.userName.invalid){
//   console.log("user id", this.loginForm.value.userName);
//  this.userDataService.verify("SANDSTORM", this.loginForm.value.userName)
//  .subscribe((response: any)=>{
//    console.log("RESPONSE", response);
//    if(response!=null){
//      if(response.data==true){
//       this.doesUserExists = false;
//       this.viewUserNameComponent = !this.viewUserNameComponent;
//       this.viewPasswordComponent = !this.viewPasswordComponent;
//       this.usernameShow = !this.usernameShow;
//      }else{
//     this.doesUserExists = true;
//      }
//    }
//  })
this.transitionToPasswordPage = true;
document.getElementById('login-page').style.opacity = "0.7";
setTimeout(()=>{
  document.getElementById('login-page').style.opacity = "1";
  this.transitionToPasswordPage = false;
  this.viewUserNameComponent = !this.viewUserNameComponent;
  this.viewPasswordComponent = !this.viewPasswordComponent;
  this.usernameShow = !this.usernameShow;
}, 1500);

}
  }


  changeInputType() {
    this.eyeOpen = !this.eyeOpen;
    if (!this.eyeOpen) {
    this.passwordType = "password";
    }
    else {
      this.passwordType = "text";
    }
  }



}
