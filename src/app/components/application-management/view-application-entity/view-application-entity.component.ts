import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApplicationModel } from '../application.model';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';



@Component({
  selector: 'app-view-application-entity',
  templateUrl: './view-application-entity.component.html',
  styleUrls: ['./view-application-entity.component.css']
})
export class ViewApplicationEntityComponent implements OnInit {



  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  platformURL = environment.platformURL;
  selectedApplicationCode = "";
  selectedApplicationName: string = "";
  selectedApplication = {
    applicationCode: "",
    applicationName: "",
    description: "",
    enabled: null,
    logo: "",
    favicon: ""
  };

  viewType = true;
  logoFile: File = null;
  faviconFile: File = null;
  logoInBase64: string = "";
  faviconInBase64: string = "";
  logoUrl: any;
  faviconUrl: any;
  application: any;
  applications: any[];

  ngOnInit() {
    this.selectedApplicationCode = "" + this.route.snapshot.params['id'];
    this.http.get(`${this.platformURL}/api/application/find/` + this.selectedApplicationCode
    )
      .subscribe((response: ApplicationModel) => {
        this.selectedApplication = response;

    if(response.enabled === true ){
      this.selectedApplication.enabled = "Enabled";
    }else if(response.enabled === false){
      this.selectedApplication.enabled = "Disabled";
    }else{
      this.selectedApplication.enabled = null;
    }
      });

  
  }
updateApplication(){
this.router.navigate(['/updateApplication', this.selectedApplication.applicationCode]);
}
abortViewAction(){

  this.router.navigate(['/applicationManagement']);
    }
}
