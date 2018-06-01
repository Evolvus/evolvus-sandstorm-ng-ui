import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-applications-entity',
  templateUrl: './list-applications-entity.component.html',
  styleUrls: ['./list-applications-entity.component.css']
})
export class ListApplicationsEntityComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
  searchText: string = "";
  ngOnInit() {

    // this.fetchSideNavNotification();
    this.http.get('http://192.168.1.115:8080/getAllApplications')
      .subscribe((applications: any[]) => {
        this.applications = applications;
      });


  }


  applications: any[];
  isSearchBarVisible: boolean = false;
  selectedApplication: { applicationId: number, applicationCode: string, applicationName: string, description: string, enabled: boolean, logo: string, favicon: string }
    = { applicationId: 0, applicationCode: "", applicationName: "", description: "", enabled: null, logo: "", favicon: "" };


  selectApplication(application) {
    this.selectedApplication = application;
  }



  viewSelectedApplication() {
    this.router.navigate(['/viewApplication', this.selectedApplication.applicationCode]);
  }

  navigateToCreateNewComponent() {
    this.router.navigate(['/createApplication']);
  }
  showSearchBar(){
    this.isSearchBarVisible = !this.isSearchBarVisible;
  }
}
