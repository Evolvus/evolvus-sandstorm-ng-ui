import { environment } from './../../environments/environment';
import {Component, OnInit,Inject} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { AuthenticationService } from './authentication/login/login.service';
import { Authentication } from "../models/authentication.model";
import { SandstormGlobalVariablesService } from './../shared/sandstorm-global-variables.service';

@Component({
  selector: 'app-login-console',
  templateUrl: './login-console.component.html',
  styleUrls: ['./login-console.component.css']
})
export class LoginConsoleComponent implements OnInit {


  loginForm: FormGroup;
  dateFormat:string;
  loginErrorMessage: string = "";
  isUserAuthenticated = false;
  color = 'primary';
    mode = 'indeterminate';
    value = 25;
  startIn = [
      { value: 'home', viewValue: 'Home' },
      { value: 'capturemandate', viewValue: 'Capture Mandate' }
    ];


   
  constructor(private authenticationService : AuthenticationService, private router : Router, private globalVariableService: SandstormGlobalVariablesService
     ) {}

  ngOnInit() {
      // this.dialogRef.updateSize("15%", "40%");
      this.loginForm = new FormGroup({
          userName: new FormControl(null, Validators.required),
          userPassword: new FormControl(null, Validators.required)
      });


  }

  login() {
      
      
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
                console.log(user);
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
  }

  // onNoClick(): void {
  // }
}
