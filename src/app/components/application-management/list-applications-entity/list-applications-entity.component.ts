import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApplicationDataService } from './../application-data.service';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-list-applications-entity',
  templateUrl: './list-applications-entity.component.html',
  styleUrls: ['./list-applications-entity.component.css']
})
export class ListApplicationsEntityComponent implements OnInit {
  searchText: string = "";
  platformURL = environment.platformURL;

  constructor(private http: HttpClient, private router: Router, private applicationDataService: ApplicationDataService) { }
  
  ngOnInit() {

this.getAllApplications();

  }


  applications: any;
  
  selectedApplication: { applicationId: number, applicationCode: string, applicationName: string, description: string, enabled: boolean, logo: string, favicon: string }
    = { applicationId: 0, applicationCode: "", applicationName: "", description: "", enabled: null, logo: "", favicon: "" };
gridSearch: boolean = false;

  selectApplication(application) {
    this.selectedApplication = application;
  }

getAllApplications(){
  this.applicationDataService.getAllApplications().subscribe((response)=>{
    this.applications = response;
  }, (err)=>{

  });
}

  viewSelectedApplication() {
    this.router.navigate(['/viewApplication', this.selectedApplication.applicationCode]);
  }

 
}
