import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApplicationModel } from '../../shared/application.model';

@Component({
  selector: 'app-update-application-entity',
  templateUrl: './view-update-application-entity.component.html',
  styleUrls: ['./view-update-application-entity.component.css']
})

export class ViewUpdateApplicationEntityComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  selectedApplicationCode = "";
  selectedApplicationName: string = "";
  selectedApplication = {
    _id: "",
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
    this.http.get('http://192.168.1.115:8080/findByCode/' + this.selectedApplicationCode
    )
      .subscribe((response: ApplicationModel) => {
        this.selectedApplication = response;
      });

  
  }



  logoUpload(file: FileList) {
    this.logoFile = file.item(0);
    var reader = new FileReader();
    reader.readAsDataURL(this.logoFile);
    reader.onload = (e) => {
      this.selectedApplication.logo = reader.result;
      this.logoInBase64 = reader.result;
    }
  }
  
  changeType() {
    this.viewType = !this.viewType;
  }

  faviconUpload(file: FileList) {
    this.faviconFile = file.item(0);
    var reader = new FileReader();
    reader.readAsDataURL(this.faviconFile);
    reader.onload = (e) => {
      this.selectedApplication.favicon = reader.result;
      this.faviconInBase64 = reader.result;
    }

  }

  saveUpdatedApplication(applicationForm: NgForm) {
    var applicationEnabled: boolean;
    this.http.put('http://192.168.1.115:8080/updateApplication/' + this.selectedApplication._id, {
      applicationCode: this.selectedApplication.applicationCode,
      applicationName: this.selectedApplication.applicationName,
      description: this.selectedApplication.description,
      enabled: this.selectedApplication.enabled,
      logo: this.selectedApplication.logo,
      favicon: this.selectedApplication.favicon
    }).subscribe((response) => {
      if (response !== "FAILURE") {
        this.application = response;
      }
    },
      (err) => {
      }
    );

  }


 



}
