import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-list-applications-entity',
  templateUrl: './list-applications-entity.component.html',
  styleUrls: ['./list-applications-entity.component.css']
})
export class ListApplicationsEntityComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
  searchText: string = "";
  platformURL = environment.platformURL;

  ngOnInit() {


    this.http.get(`${this.platformURL}/application`)
      .subscribe((response: any) => {
         if(response.message == "No applications found"){
            this.areAnyApplicationsAvailable = false;
        }else{
          this.applications = response;
          this.areAnyApplicationsAvailable = true;
        }
      });


  }


  applications: any;
  areAnyApplicationsAvailable: boolean = false;
  selectedApplication: { applicationId: number, applicationCode: string, applicationName: string, description: string, enabled: boolean, logo: string, favicon: string }
    = { applicationId: 0, applicationCode: "", applicationName: "", description: "", enabled: null, logo: "", favicon: "" };
gridSearch: boolean = false;

  selectApplication(application) {
    this.selectedApplication = application;
  }



  viewSelectedApplication() {
    this.router.navigate(['/viewApplication', this.selectedApplication.applicationCode]);
  }

 
}
