import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-application-entity',
  templateUrl: './save-application-entity.component.html',
  styleUrls: ['./save-application-entity.component.css']
})
export class SaveApplicationEntityComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {


  }


  logoFile: File = null;
  faviconFile: File = null;
  logoInBase64: string = "";
  faviconInBase64: string = "";
  logoUrl: any;
  faviconUrl: any;
  applicationSuccessfullySaved: boolean = undefined;
  application: any;
  applicationStatus: string ="";
  


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

    var applicationStatus: boolean;
    if(applicationForm.form.value.applicationStatus === "enabled"){
   applicationStatus = true;
    }else if(applicationForm.form.value.applicationStatus === "disabled"){
   applicationStatus = false;
    }else{
      applicationStatus = null;
    }

    var result = this.http.post('http://192.168.1.115:8086/saveApplication',
      {
        applicationCode: applicationForm.form.value.applicationCode,
        applicationName: applicationForm.form.value.applicationName,
        description: applicationForm.form.value.applicationDescription,
        enabled:  applicationStatus,
        logo: this.logoInBase64,
        favicon: this.faviconInBase64
      
      }).subscribe((response) => {
        if (response !== "FAILURE") {
          this.application = response;
          this.applicationSuccessfullySaved = true;
        }
      },
        (err) => {
          console.log(err);
          this.applicationSuccessfullySaved = false;
        }
      );

  }

  abortSaveAction(){
    this.router.navigate(['/applicationManagement']);
      }

}
