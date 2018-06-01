import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ResponsiveService } from '../../shared/responsive.service';

@Component({
  selector: 'app-save-application-entity',
  templateUrl: './save-application-entity.component.html',
  styleUrls: ['./save-application-entity.component.css']
})
export class SaveApplicationEntityComponent implements OnInit {

  constructor(private http: HttpClient, private responsiveService: ResponsiveService) { }

  ngOnInit() {

    this.fetchSideNavNotification();

    this.responsiveService.sideNavOpen.subscribe((sideNavOpenNotification) => {
      var saveAppElement = document.getElementById('create-application');
      if (saveAppElement !== null) {
        if (sideNavOpenNotification === true) {
          document.getElementById('create-application').style.marginLeft = "11em";
        } else {
          document.getElementById('create-application').style.marginLeft = "2em";
        }
      }
    });
  }

  ngAfterViewInit() {
    this.fetchSideNavNotification();
  }
  logoFile: File = null;
  faviconFile: File = null;
  logoInBase64: string = "";
  faviconInBase64: string = "";
  logoUrl: any;
  faviconUrl: any;
  applicationSuccessfullySaved: boolean = undefined;
  application: any;

  fetchSideNavNotification() {
    var isSideNavOpen = this.responsiveService.isSideNavOpen;
    if (isSideNavOpen === true) {
      document.getElementById('create-application').style.marginLeft = "11em";
    } else {
      document.getElementById('create-application').style.marginLeft = "2em";
    }
  }


  logoUpload(file: FileList) {
    this.logoFile = file.item(0);
    var reader = new FileReader();
    reader.readAsDataURL(this.logoFile);
    let logoFileName = this.logoFile.name;
    reader.onload = (e) => {
      this.logoUrl = reader.result;
      this.logoInBase64 = reader.result;
    }

  }


  faviconUpload(file: FileList) {
    this.faviconFile = file.item(0);
    var reader = new FileReader();
    reader.readAsDataURL(this.faviconFile);
    let faviconFileName = this.faviconFile.name;
    reader.onload = (e) => {
      this.faviconUrl = reader.result;
      this.faviconInBase64 = reader.result;
    }

  }

  saveApplication(applicationForm: NgForm) {
    var applicationEnabled: boolean;
    if (applicationForm.form.value.applicationEnabled === 'yes') {
      applicationEnabled = true;
    } else {
      applicationEnabled = false;
    }
    var result = this.http.post('http://192.168.1.115:8080/saveApplication',
      {
        applicationId: +applicationForm.form.value.applicationId,
        applicationCode: applicationForm.form.value.applicationCode,
        applicationName: applicationForm.form.value.applicationName,
        description: applicationForm.form.value.applicationDescription,
        enabled: applicationEnabled,
        logo: this.logoInBase64,
        favicon: this.faviconInBase64
      }).subscribe((response) => {
        if (response !== "FAILURE") {
          console.log(response);
          this.application = response;
          this.applicationSuccessfullySaved = true;
        }
      },
        (err) => {
          this.applicationSuccessfullySaved = false;
        }
      );

  }

}
