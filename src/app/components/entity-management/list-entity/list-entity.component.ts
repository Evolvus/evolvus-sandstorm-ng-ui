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
  listOfParentEntities: string [] = [];
  tableHeader: any[];
  listOfEntities: any = [];
  defaultFilterCriteria = {
    parent: "",
    enableFlag: "",
    processingStatus: "",
    pageSize: 5,
    pageNo: 1
  };
  noEntityDataMessage: string = "";
  noOfEntitiesInCurrentPage: number = 0;
  pageSize: number= 5;
  pageNo: number= 1;
  totalNoOfPages: number = 1;
  totalNoOfEntities: number = 0;
  startIndex: number = 0;
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
    this.entityService.getFilteredEntityData(this.defaultFilterCriteria.parent, this.defaultFilterCriteria.enableFlag, this.defaultFilterCriteria.processingStatus,this.defaultFilterCriteria.pageSize, this.defaultFilterCriteria.pageNo).subscribe((response: any )=>{
    if(response.totalNoOfRecords==0){
      this.defaultFilterCriteria.processingStatus = "AUTHORIZED";
  
      this.entityService.getFilteredEntityData(this.defaultFilterCriteria.parent, this.defaultFilterCriteria.enableFlag, this.defaultFilterCriteria.processingStatus,this.defaultFilterCriteria.pageSize, this.defaultFilterCriteria.pageNo).subscribe((response: any)=>{
          this.listOfEntities = response.data;
          this.totalNoOfEntities = response.totalNoOfRecords;
          this.totalNoOfPages = response.totalNoOfPages;
          this.startIndex = 1;
          this.setCurrentPage(0);
      }, (err)=>{
        this.noEntityDataMessage = "Server Error! Try Again Later!";
      })
    }else{
          this.listOfEntities = response.data;
          this.totalNoOfEntities = response.totalNoOfRecords;
          this.totalNoOfPages = response.totalNoOfPages;
          this.startIndex = 1;
          this.setCurrentPage(0);
    }
    }
    , (err)=>{
      this.noEntityDataMessage = "Server Error! Try Again Later!";
    });
  }
  getAllEntityData(){
    this.entityService.getAllEntityData(this.pageSize, this.pageNo).
    subscribe((response: any)=>{
        this.listOfEntities = response.data;
        this.totalNoOfEntities = response.totalNoOfRecords;
        this.totalNoOfPages = response.totalNoOfPages;
        this.setCurrentPage(0);
    }, (err)=>{
      this.noEntityDataMessage = "Server Error! Try Again Later!";
    });
  
  }

  getFilteredEntityData(){
    this.listOfEntities = [];
    this.entityService.getFilteredEntityData(this.defaultFilterCriteria.parent, this.defaultFilterCriteria.enableFlag, this.defaultFilterCriteria.processingStatus,this.pageSize, this.pageNo)
    .subscribe((response: any)=>{
        this.listOfEntities = response.data;
        this.totalNoOfEntities = response.totalNoOfRecords;
        this.totalNoOfPages = response.totalNoOfPages;
        this.setCurrentPage(0);
    });
    
  }



  checkBoxTicked(value){
  
    this.isViewAllOptionSelected = !this.isViewAllOptionSelected;
    if(value){
      console.log("getAllEntityData()");
      this.getAllEntityData();        
    }else{
          this.getFilteredEntityData();
    }

      }


      view(entity){  
        this.router.navigate(['viewEntity', entity.entityId]);  
        }


        setCurrentPage(movement: number){ 
          if(movement == 1){ //next page
        this.pageNo = this.pageNo + 1;
        if(this.isViewAllOptionSelected){
          this.getAllEntityData();
        }else{
          this.getFilteredEntityData();
        }
        this.startIndex = (this.pageSize * this.startIndex);
          }else if(movement == -1 && this.pageNo > 1){  //prev page 
            this.pageNo = this.pageNo - 1;
            if(this.isViewAllOptionSelected){
              this.getAllEntityData();
            }else{
              this.getFilteredEntityData();
            }
            this.startIndex = (this.startIndex - this.pageSize+1);
          }else if(movement == 0){    
            console.log(this.listOfEntities, "listOfEnt");
            //only for pagination purpose
            if(this.listOfEntities.length == this.pageSize){
              this.noOfEntitiesInCurrentPage = this.pageSize;
            }else{
              this.noOfEntitiesInCurrentPage = this.totalNoOfEntities;
            }
          }
        
        }

        



}
