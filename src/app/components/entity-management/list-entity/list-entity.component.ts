import { EntityDataService } from "./../entity-data.service";
import { EntityModel } from "./../entity.model";
import { Component, OnInit } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-list-entity",
  templateUrl: "./list-entity.component.html",
  styleUrls: ["./list-entity.component.css"]
})
export class ListEntityComponent implements OnInit {
  platformURL = environment.platformURL;
  isViewAllOptionSelected: boolean = false;
  listOfParentEntities: string[] = [];
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
  pageSize: number = 5;
  pageNo: number = 1;
  totalNoOfPages: number = 1;
  totalNoOfEntities: number = 0;
  startIndex: number = 0;
  constructor(
    private router: Router,
    private entityService: EntityDataService
  ) {}

  ngOnInit() {
    this.tableHeader = this.entityService.getTableHeaders();
    this.defaultFilterCriteria.processingStatus = "PENDING_AUTHORIZATION";
    this.defaultFilterCriteria = this.entityService.getDefaultFilterCriteria();
    this.getListOfEntities();
    this.getEntityDataBasedOnDefaultFilterCriteria();
  }

  getListOfEntities() {
    this.entityService.getAllEntities(0, 1).subscribe((response: any) => {
      this.listOfParentEntities = response.data;
    });
  }

  getEntityDataBasedOnDefaultFilterCriteria() {
    this.listOfEntities = [];
    this.entityService
      .getFilteredEntityData(
        this.defaultFilterCriteria.parent,
        this.defaultFilterCriteria.enableFlag,
        this.defaultFilterCriteria.processingStatus,
        this.defaultFilterCriteria.pageSize,
        this.defaultFilterCriteria.pageNo
      )
      .subscribe(
        (response: any) => {
          if (response.totalNoOfRecords == 0) {
            this.defaultFilterCriteria.processingStatus = "AUTHORIZED";

            this.entityService
              .getFilteredEntityData(
                this.defaultFilterCriteria.parent,
                this.defaultFilterCriteria.enableFlag,
                this.defaultFilterCriteria.processingStatus,
                this.defaultFilterCriteria.pageSize,
                this.defaultFilterCriteria.pageNo
              )
              .subscribe(
                (response: any) => {
                  this.listOfEntities = response.data;
                  this.totalNoOfEntities = response.totalNoOfRecords;
                  this.totalNoOfPages = response.totalNoOfPages;
                  this.startIndex = 1;
                  this.setCurrentPage(0);
                },
                err => {
                  this.noEntityDataMessage = "Server Error! Try Again Later!";
                }
              );
          } else {
            this.listOfEntities = response.data;
            this.totalNoOfEntities = response.totalNoOfRecords;
            this.totalNoOfPages = response.totalNoOfPages;
            this.startIndex = 1;
            this.setCurrentPage(0);
          }
        },
        err => {
          this.entityService
            .openDialog("error", err.error.description)
            .subscribe(result => {
              // console.log("Server Down");
            });
        }
      );
  }
  getAllEntityData() {
    this.entityService.getAllEntities(this.pageSize, this.pageNo).subscribe(
      (response: any) => {
        this.startIndex = 1;
        this.pageNo = 1;
        this.listOfEntities = response.data;
        this.totalNoOfEntities = response.totalNoOfRecords;
        this.totalNoOfPages = response.totalNoOfPages;
        this.setCurrentPage(0);
      },
      err => {
        this.startIndex = 0;
        this.noEntityDataMessage = "Server Error! Try Again Later!";
      }
    );
  }

  getFilteredEntityData(source) {
    if (source == "filter") {
      this.pageNo = 1;
      this.startIndex = 1;
    }
    this.listOfEntities = [];
    this.entityService
      .getFilteredEntityData(
        this.defaultFilterCriteria.parent,
        this.defaultFilterCriteria.enableFlag,
        this.defaultFilterCriteria.processingStatus,
        this.pageSize,
        this.pageNo
      )
      .subscribe((response: any) => {
        this.listOfEntities = response.data;
        this.totalNoOfEntities = response.totalNoOfRecords;
        this.totalNoOfPages = response.totalNoOfPages;
        this.setCurrentPage(0);
      });
  }

  checkBoxTicked(value) {
    this.isViewAllOptionSelected = !this.isViewAllOptionSelected;
    if (value) {
      
      this.getAllEntityData();
    } else {
      this.getFilteredEntityData("filter");
    }
  }

  view(entity) {
    this.router.navigate(["viewEntity", entity.entityCode]);
  }

  setCurrentPage(movement: number) {
    if (movement == 1) {
      //next page
      this.pageNo = this.pageNo + 1;
      if (this.isViewAllOptionSelected) {
        this.getAllEntityData();
      } else {
        this.getFilteredEntityData("");
      }
      this.startIndex = this.pageSize * this.startIndex;
    } else if (movement == -1 && this.pageNo > 1) {
      //prev page
      this.pageNo = this.pageNo - 1;
      if (this.isViewAllOptionSelected) {
        this.getAllEntityData();
      } else {
        this.getFilteredEntityData("");
      }
      this.startIndex = this.startIndex - this.pageSize + 1;
    } else if (movement == 0) {
      //only for pagination purpose
      // if(this.listOfEntities.length == 0){
      //   // this.startIndex = 0;
      //   this.pageNo = 0;
      // }
      if (this.listOfEntities.length == this.pageSize) {
        this.noOfEntitiesInCurrentPage = this.pageSize * (this.pageNo);
      } else {
        this.noOfEntitiesInCurrentPage = this.totalNoOfEntities;
      }
    }
  }

  setPageSize() {
    this.pageNo = 1;
    this.startIndex = 1;
    if (this.isViewAllOptionSelected) {
      this.getAllEntityData();
    } else {
      this.getFilteredEntityData("");
    }
  }
}
