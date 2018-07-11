import { environment } from './../../../../environments/environment';
import { Authentication } from './../../../models/authentication.model';

import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subject} from "rxjs";

@Injectable()
export class AuthenticationService {
    serviceUrl: string = environment.platformURL;
    isAuthenticated = false;
    authenticatedSubject = new Subject();
    dtFormat :string;
    userData = new Subject<any>();
    constructor(private http : HttpClient, private router : Router) {}




    authenticate(authentication : Authentication) {
        console.log('authenticate ',authentication);
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
        // this.router.navigate([""]);
        this.authenticatedSubject.next(false);
        this.http.get(`${this.serviceUrl}/logoutClearance`).subscribe(data => {
            this.router.navigate(['login']);
        });
    }
}
