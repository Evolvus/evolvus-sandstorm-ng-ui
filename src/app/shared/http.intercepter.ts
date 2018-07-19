
import {
    HttpEvent,
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpHeaders,
    HttpClient
} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import { AuthenticationService } from './../login-console/authentication/login/login.service';


@Injectable()
export class JWTTokenIntercepter implements HttpInterceptor {
    serviceUrl = environment.platformURL;
    headers: HttpHeaders;
    constructor(private http : HttpClient, private router : Router, private authService : AuthenticationService) {
        this.headers = new HttpHeaders({"Content-Type": "application/json"});
    }

    intercept(req : HttpRequest<any>, next : HttpHandler): Observable<HttpEvent<any>> {
        //1.Step  check authService.isAuthenticated is 'false' if yes continue the request.
        if (this.authService.isAuthenticated === false) {
            if (req.url === `${this.serviceUrl}/auth`) {
                return next.handle(req);
                
            } else {
                this.authService.isAuthenticated = false;
                this.authService.authenticatedSubject.next(this.authService.isAuthenticated);
                this.router.navigate(['login']);
                return new Observable<null>(); 
//before it was returning only null.. throws an error TypeError: You provided an invalid object where a stream was expected. You can provide an Observable, Promise, Array, or Iterable
            }
        }

        //2.Step check authService.isAuthenticated is 'true'
        if (this.authService.isAuthenticated === true && this.authService.getToken() != null) {
            if (req.url != `${this.serviceUrl}/sessionCheck`) {
                this.isSessionActive().subscribe((session : any) => {
                    if (session != null) {
                        this.authService.setToken(session.token);
                        this.authService.isAuthenticated = true;
                        this.authService.authenticatedSubject.next(this.authService.isAuthenticated);
                        this.headers = new HttpHeaders({"Content-Type": "application/json", Authorization: this.authService.getToken()});
                        const modifiedRequest = req.clone({headers: this.headers});
                        return next.handle(modifiedRequest);
                    } else {
                        this.authService.isAuthenticated = false;
                        this.authService.authenticatedSubject.next(this.authService.isAuthenticated);
                        this.router.navigate(['sessionExpired']);
                        return new Observable<null>(); 
                    }
                }, err => {
                    this.authService.isAuthenticated = false;
                    this.authService.authenticatedSubject.next(this.authService.isAuthenticated);
                    this.router.navigate(['sessionExpired']);
                    return new Observable<null>(); 
                });
            }

            this.headers = new HttpHeaders({"Content-Type": "application/json", Authorization: this.authService.getToken()});
            const modifiedRequest = req.clone({headers: this.headers});
            return next.handle(modifiedRequest);
        }
    }

    isSessionActive() {
        return this.http.get(`${this.serviceUrl}/sessionCheck`, {headers: this.headers});
    }

    /*
    console.log("1.isAuthenticated", this.authService.isAuthenticated);
        if (localStorage.getItem("token") != null) {
            this.headers = new HttpHeaders({"Content-Type": "application/json", Authorization: localStorage.getItem("token")});
        }
        console.log("2.isAuthenticated", this.authService.isAuthenticated);
        const modifiedRequest = req.clone({headers: this.headers});
        console.log("3.isAuthenticated", this.authService.isAuthenticated);
        if (req.url != `${this.serviceUrl}/sessionCheck` && req.url != `${this.serviceUrl}/auth`) {
            console.log("4.isAuthenticated", this.authService.isAuthenticated);
            this.http.get(`${this.serviceUrl}/sessionCheck`, {headers: this.headers}).subscribe((data : any) => {
                console.log("5.isAuthenticated", this.authService.isAuthenticated);
                if (data) {
                    this.authService.isAuthenticated = true;
                    console.log("token", data.token.toString());
                    localStorage.setItem("token", data.token.toString());
                }
                return next.handle(modifiedRequest);
            }, err => {
                console.log("6.isAuthenticated", this.authService.isAuthenticated);
                console.log("Error in sessionCheck", err);
                this.authService.isAuthenticated = false;
                //this.router.navigate(["sessionExpired"]);
                return next.handle(modifiedRequest);
            });
        } else if (this.authService.isAuthenticated === false) {
            console.log("6.isAuthenticated", this.authService.isAuthenticated);
            return next.handle(modifiedRequest);
        } else {
            console.log("7.isAuthenticated", this.authService.isAuthenticated);
            this.router.navigate(["/login"]);
            return next.handle(modifiedRequest);
        }
    */
}
