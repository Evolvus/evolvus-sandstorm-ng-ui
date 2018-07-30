
import { StarterContentService } from './starter-content.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SandstormGlobalVariablesService } from '../../shared/sandstorm-global-variables.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starter-content',
  templateUrl: './starter-content.component.html',
  styleUrls: ['./starter-content.component.css']
})
export class StarterContentComponent implements OnInit {

user: any;
eventData: any = [];

  constructor(private globalVariableService: SandstormGlobalVariablesService, private starterContentService: StarterContentService, private router: Router)
 { }


  ngOnInit() {
this.user = this.globalVariableService.currentUser;  
this.starterContentService.getSWEEventData()
.subscribe((eventData: any)=>{
  if(eventData!=null){
    this.eventData = eventData.data;
  }
  
});



  }

getTimeOfRequest(dateTime){
var eventDateTime = dateTime;
var currentDateTime = +new Date();
var eventDateTimeInMilliSeconds = +new Date(eventDateTime);
var currentDateTimeInMilliSeconds = +new Date();
var differenceDateTimeInMilliSeconds = currentDateTimeInMilliSeconds - eventDateTimeInMilliSeconds;
var requestDateTimeInHours = (differenceDateTimeInMilliSeconds/(24*60*60*1000));
return Math.ceil(requestDateTimeInHours);
}




view(wfEntity, wfInstanceId){
  this.starterContentService.getWfEntityData(wfEntity, wfInstanceId).subscribe((response: any)=>{
    if(response.data.length!=0){
      if(wfEntity=='ENTITY'){
        this.router.navigate(["viewEntity", response.data[0].entityCode]);
      }else if(wfEntity=='ROLE'){
        this.router.navigate(["viewRole", response.data[0].roleName]);
      }else if(wfEntity=='APPLICATION'){
        this.router.navigate(['viewApplication', response.data[0].applicationCode]);
      }else if(wfEntity=='USER'){
        this.router.navigate(["viewUser", response.data[0].userName]);
      }
    }
  })

}

}
