import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EntityService } from './../../shared/services/entityservice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-entitymanagement',
  templateUrl: './entitymanagement.component.html',
  styleUrls: ['./entitymanagement.component.css']
})
export class EntitymanagementComponent implements OnInit {

  savingEntityObject: any = {};
  entities: any;
  areAnyEntitiesAvailable: boolean = false;
  subscription: Subscription;
  searchText: string = "";
  platformURL = environment.platformURL;

  constructor(private http: HttpClient, private router: Router, public entityService: EntityService) {  }

  ngOnInit() {
    this.entityService.fetchAllEntities();
    this.subscription = this.entityService.allEntityExport.subscribe((entitiesExported) => {
      this.entities = entitiesExported;
      console.log("entitites length",this.entities);      
    }); 

  if(this.entities==null || this.entities==undefined || this.entities.length===0){
    this.areAnyEntitiesAvailable=false;
  }
  else{
    this.areAnyEntitiesAvailable=true;
  }
  }
}
