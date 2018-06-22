import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog-entity',
  templateUrl: './confirmation-dialog-entity.component.html',
  styleUrls: ['./confirmation-dialog-entity.component.css']
})
export class ConfirmationDialogEntityComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<ConfirmationDialogEntityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.statusMessage = this.data.message;
    this.messageType = this.data.type;
  }
  statusMessage: string = "";
messageType: string = "";

  onNoClick(): void {
    this.dialogRef.close();
  }

}
