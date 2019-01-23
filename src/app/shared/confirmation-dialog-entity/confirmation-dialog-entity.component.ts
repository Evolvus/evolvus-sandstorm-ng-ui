import { Validators, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-confirmation-dialog-entity',
  templateUrl: './confirmation-dialog-entity.component.html',
  styleUrls: ['./confirmation-dialog-entity.component.css']
})
export class ConfirmationDialogEntityComponent implements OnInit {


  statusMessage: string = "";
messageType: string = "";
type: string="";
serverError: boolean = false;
commentForm: FormGroup = new FormGroup({comments: new FormControl('',[Validators.required,Validators.minLength(5), Validators.maxLength(255)])});
  constructor(  public dialogRef: MatDialogRef<ConfirmationDialogEntityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.statusMessage = this.data.message;
    this.messageType = this.data.msgtype;
    this.type = this.data.actionType;
    console.log("this.type",this.type);

    if(this.type === "APPROVE"){
      this.commentForm.get('comments').clearValidators();
      this.commentForm.updateValueAndValidity();
    }else{
      this.commentForm.get('comments').setValidators([Validators.required,Validators.minLength(5), Validators.maxLength(255)]);
      this.commentForm.get('comments').updateValueAndValidity();
    }

    if(this.statusMessage == undefined){
    this.serverError = true;
    }
  }

  onNoClick(status): void {
  this.dialogRef.close(status);
  }

addComments(status){
  if(this.type=='APPROVE'){
    this.commentForm.patchValue({comments: 'Accepted'});
  }
  this.dialogRef.close({comments: this.commentForm.value.comments, status: status});
}


}
