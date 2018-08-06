import { BulkUploadService } from './bulk-upload.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.css']
})
export class BulkUploadComponent implements OnInit {


  fileTypes: any[]=[];

  constructor(private bulkUploadService: BulkUploadService) { }

  ngOnInit() {
    this.bulkUploadService.getListOfFileTypes().subscribe((response: any)=>{
      if(response!=null){
        this.fileTypes = response.data;
      }
    });
  }
  saveFile(selectedFile){
   console.log("selectedFile", selectedFile);
  }

}
