import { environment } from './../../environments/environment';
import {Component, OnInit,Inject, ViewChild, ElementRef} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { AuthenticationService } from './authentication/login/login.service';
import { Authentication } from "../models/authentication.model";
import { SandstormGlobalVariablesService } from './../shared/sandstorm-global-variables.service';


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



  constructor(el: ElementRef, private authenticationService : AuthenticationService, private router : Router, private globalVariableService: SandstormGlobalVariablesService
     ) {}

  ngOnInit() {
      this.loginForm = new FormGroup({
          userName: new FormControl('', [Validators.required, Validators.minLength(6)], ),
          userPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
      });


  }

  ngAfterViewInit(){
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
                //Need to update below hardcoded to user.supportedDtformat.format
                this.authenticationService.dtFormat = 'dd/MM/yyyy hh:mm:ss';
                this.dateFormat =this.authenticationService.dtFormat;
                this.globalVariableService.currentUser = user.data;
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
          this.router.navigate(["login"]);

      });
    }else{
      this.loginForm.controls['userPassword'].setErrors({'incorrect' : true});
    }   
  }




  changeView(){
if(!this.loginForm.controls.userName.invalid){
  this.viewUserNameComponent = !this.viewUserNameComponent;
  this.viewPasswordComponent = !this.viewPasswordComponent;
  this.usernameShow = !this.usernameShow;
}
  }
}
