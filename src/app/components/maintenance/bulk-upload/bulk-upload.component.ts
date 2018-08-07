import { BulkUploadService } from './bulk-upload.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.css']
})
export class BulkUploadComponent implements OnInit {


  fileTypes: any[]=[];
  selectedFileType: any;
  selectedFile: any;
  constructor(private bulkUploadService: BulkUploadService) { }

  ngOnInit() {
    this.bulkUploadService.getListOfFileTypes().subscribe((response: any)=>{
      if(response!=null){
        this.fileTypes = response.data;
      }
    });
  }
  upload(event){
    console.log(event);
    
   this.selectedFile = event.file;
    if(event.file!=null){
      this.bulkUploadService.upload(event.file, event.fileType.lookupCode, event.fileType.value)
      .subscribe((response: any)=>{
        this.bulkUploadService.openDialog(
          "success",
          "File Uploaded Successfully!"   
        ).subscribe((result)=>{

        });
      });
    }
  }


}
