import { EntityModel } from './../entity.model';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EntityDataService } from '../entity-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-entity',
  templateUrl: './list-entity.component.html',
  styleUrls: ['./list-entity.component.css']
})
export class ListEntityComponent implements OnInit {

  platformURL = environment.platformURL;
  isViewAllOptionSelected: boolean = false;
  listOfParentEntities: string [];
  tableHeader: string[];
  listOfEntities: EntityModel[];
  defaultFilterCriteria = {
    parent: "",
    enableFlag: "",
    processingStatus: ""
  } 
  noEntityDataMessage: string = "";
  constructor(private router: Router, private entityService: EntityDataService) {  }

  ngOnInit() {
    this.tableHeader =this.entityService.getTableHeaders();
    this.defaultFilterCriteria = this.entityService.getDefaultFilterCriteria();
    this.getListOfEntityNames();
    this.getEntityDataBasedOnDefaultFilterCriteria();
  }


  getListOfEntityNames(){
    this.entityService.getAllEntityNames().subscribe((response: string[])=>{
      this.listOfParentEntities = response;
    });
  }
  

  getEntityDataBasedOnDefaultFilterCriteria(){
    this.listOfEntities = [];
    this.entityService.getFilteredEntityData(this.defaultFilterCriteria.parent, this.defaultFilterCriteria.enableFlag, this.defaultFilterCriteria.processingStatus).subscribe((response: EntityModel[])=>{
    if(response.length == 0){
      this.defaultFilterCriteria.processingStatus = "AUTHORIZED";
  
      this.entityService.getFilteredEntityData(this.defaultFilterCriteria.parent, this.defaultFilterCriteria.enableFlag, this.defaultFilterCriteria.processingStatus).subscribe((response: EntityModel[])=>{

        if(response.length == 0){
          this.noEntityDataMessage = "No Roles Found! Use the Add Role button to create a new role!";
        }else{
          this.listOfEntities = response;
          
        }
      })
    }else{
      this.listOfEntities = response;
      
    }
    // this.setCurrentPage(-1);
    }
    , (err)=>{
  console.log(err, "getRoleDataBasedOnDefaultFilterCriteria()");
    });
  
  }
  getAllEntityData(){
    this.entityService.getAllEntityData().
    subscribe((entityData: EntityModel[])=>{
      if(entityData != []){
        this.listOfEntities = entityData;
        // this.setCurrentPage(0);
      }else{
        this.noEntityDataMessage = "No Roles Found! Use the Add Role button to create a new role!";
      }
    }, (err)=>{
      console.log("getRoleData()", err);
    });
    // this.setNoOfRolesInCurrentPage();
  
  }

  getFilteredEntityData(){

    this.entityService.getFilteredEntityData(this.defaultFilterCriteria.parent, this.defaultFilterCriteria.enableFlag, this.defaultFilterCriteria.processingStatus)
    .subscribe((response: EntityModel[])=>{
      this.listOfEntities = response;
      // this.setCurrentPage(-1);
    });
    
  }



  checkBoxTicked(value){
    this.isViewAllOptionSelected = !this.isViewAllOptionSelected;
    if(value){
      this.getAllEntityData();        
    }else{
          this.getFilteredEntityData();
    }

      }


      view(entity){  
        this.router.navigate(['viewEntity', entity.entityId]);  
        }


}
