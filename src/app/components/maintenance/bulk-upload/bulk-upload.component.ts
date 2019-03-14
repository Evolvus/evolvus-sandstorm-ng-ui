import { BulkUploadService } from './bulk-upload.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ExcelService } from './excel-service.service';
import { SandstormGlobalVariablesService } from 'src/app/shared/sandstorm-global-variables.service';



@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.css']
})
export class BulkUploadComponent implements OnInit {

  tableHeader: string[] = ['File Name', 'Total Transaction', 'Processed Count', 'Creation Date', 'Uploaded By', 'Process Status', 'Error Log'];
  fileTypes: any[] = [];
  selectedFileType: any;
  selectedFile: any;
  listOfFiles: any = [];
  noOfFilesInCurrentPage: number = 0;
  pageSize: number = 5;
  pageNo: number = 1;
  totalNoOfPages: number = 0;
  totalNoOfFiles: number = 0;
  startIndex: number = 1;
  listOfExcelObjs: ExcelObject[] = [];
  excelObj: ExcelObject;
  loggedInUser: any;
  uploadInitiated: Boolean = false;
  @ViewChild('tablescroll', { read: ElementRef }) public tablescroll: ElementRef;

  public scrollRight(): void {
    this.tablescroll.nativeElement.scrollTo({ left: (this.tablescroll.nativeElement.scrollLeft + 300), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.tablescroll.nativeElement.scrollTo({ left: (this.tablescroll.nativeElement.scrollLeft - 300), behavior: 'smooth' });
  }

  ngOnInit() {
    this.loggedInUser = this.bulkUploadService.getCurrentUserData();

    this.bulkUploadService.getListOfFileTypes().subscribe((response: any) => {
      if (response != null) {

        this.fileTypes = response.data;
      }
    });
    this.getFiles();
  }

  upload(event) {

    if (!this.uploadInitiated) {
      this.uploadInitiated = true;
      var fileName = event.file.name;
      var preffixFileName = fileName.substring(0, fileName.lastIndexOf("."));
      preffixFileName = preffixFileName.concat("_" + this.loggedInUser.value.tenantId);
      var suffixFileName = fileName.substring(fileName.lastIndexOf("."));
      fileName = preffixFileName.concat(suffixFileName);
      this.bulkUploadService.getFileByName(fileName).subscribe((response: any) => {

        if (response.data.length == 0) {

          this.selectedFile = event.file;
          if (event.file != null) {
            this.bulkUploadService.upload(event.file, event.fileType.lookupCode, event.fileType.value)
              .subscribe((response: any) => {
                if (response != null) {
                  this.getFilesInInterval(5);

                  this.bulkUploadService.openDialog(
                    "success",
                    "file is successfully uploaded. Verification and Processing is In-progress. File with status will be updated in few minutes."
                  ).subscribe((result) => {
                    this.uploadInitiated = false;
                  });

                }

              });
          }
        } else {
          this.bulkUploadService.openDialog(
            "error",
            "selected file is already exist"
          ).subscribe((result) => {
            this.uploadInitiated = false;


          });

        }
      });
    }
  }
  getFiles() {
    this.bulkUploadService.getAllFiles(this.pageSize, this.pageNo).subscribe((response: any) => {

      this.listOfFiles = response.data;
      this.totalNoOfFiles = response.totalNoOfRecords;
      this.totalNoOfPages = response.totalNoOfPages;
      this.setCurrentPage(0);
    });
  }
  setCurrentPage(movement: number) {
    if (movement == 1) {
      //next page
      this.pageNo = this.pageNo + 1;
      this.getFiles();

      this.startIndex = this.pageSize * (this.pageNo - 1) + 1;
    } else if (movement == -1 && this.pageNo > 1) {
      //prev page
      this.pageNo = this.pageNo - 1;
      this.getFiles();
      this.startIndex = this.startIndex - this.pageSize;
    } else if (movement == 0) {
      //only for pagination purpose
      if (this.listOfFiles.length == this.pageSize) {

        this.noOfFilesInCurrentPage = this.pageSize * this.pageNo;
      } else {
        this.noOfFilesInCurrentPage = this.totalNoOfFiles;
      }
    }
  }
  setPageSize() {
    this.pageNo = 1;
    this.startIndex = 1;
    this.getFiles();

  }


  exportAsXLSX(event, file): void {
    var excelObj = new ExcelObject();
    excelObj.fileName = file.fileName;
    excelObj.fileType = file.fileType;
    excelObj.totalTransaction = file.totalTransaction;
    excelObj.uploadedBy = file.uploadedBy;
    excelObj.processingStatus = file.processingStatus;
    excelObj.errorLog = file.errorLog;

    this.listOfExcelObjs.push(excelObj);

    this.excelService.exportAsExcelFile(this.listOfExcelObjs, `Error-bulkUpload File`);
    this.listOfExcelObjs = [];
  }
  constructor(private bulkUploadService: BulkUploadService, private excelService: ExcelService) {
  }


  getFilesInInterval(intervalTime) {
    var refreshCount = 0;
    var interval = setInterval(() => {
      if (refreshCount <= intervalTime) {
        this.getFiles();
      } else {
        clearInterval(interval);
      }
    }, 1000 * intervalTime);
  }
}
export class ExcelObject {
  fileName: any;
  fileType: any;

  totalTransaction: any;
  uploadedBy: any;
  processingStatus: any;
  errorLog: any;
}

