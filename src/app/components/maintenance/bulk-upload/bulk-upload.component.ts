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
  upload(response){
   this.selectedFile = response.file;
   if(this.selectedFile!=null){
     this.bulkUploadService.upload(response.file, response.fileType.lookupCode, response.fileType.value)
     .subscribe((response: any)=>{
this.bulkUploadService.openDialog(
  "success",
 response.description
).subscribe((result)=>{
// this.router.navigate(['entityManagement']);
});
     })
   }
  }


}
