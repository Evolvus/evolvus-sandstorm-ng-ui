import { Authentication } from './../../../models/authentication.model';
import { environment } from './../../../../environments/environment';

import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import { SandstormGlobalVariablesService } from './../../../shared/sandstorm-global-variables.service';




@Injectable()
export class AuthenticationService {
    serviceUrl: string = environment.platformURL;
    isAuthenticated = false;
    authenticatedSubject = new Subject();
    dtFormat :string;
    userData = new Subject<any>();
    constructor(private http : HttpClient, private router : Router, private globalVariableService: SandstormGlobalVariablesService) {
    }



    authenticate(authentication : Authentication) {
        return this.http.post(`${this.serviceUrl}/auth`, authentication);
    }

    setToken(token) {
        localStorage.setItem("token", token);
    } 

    getToken() {
        return localStorage.getItem("token");
    }
    

    logout() {
        localStorage.clear();
        this.isAuthenticated = false;
        this.authenticatedSubject.next(this.isAuthenticated);
        location.href='/';
        this.globalVariableService.currentUser = null;
        this.http.get(`${this.serviceUrl}/logoutClearance`).subscribe(data => {

            this.router.navigate(['login']);
        
        });
    }
}
