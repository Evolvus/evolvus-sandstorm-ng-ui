import { EntityModel } from './../entity.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EntityDataService } from '../entity-data.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.css']
})


export class AddEntityComponent implements OnInit {

  entityData: EntityModel;
  entityForm: FormGroup;
  parentEntities: any;
  listOfParentEntities: String[];

  constructor(public formBuilder: FormBuilder, private entityService: EntityDataService, private router: Router) {
    this.entityForm = new FormGroup({
      name: new FormControl(''),
      entityCode: new FormControl(''),
      parent: new FormControl(''),
      description: new FormControl(''),
      enableFlag: new FormControl('')
    });
  }

  ngOnInit() {
  this.getAllEntityNames();
   
  }


getAllEntityNames(){
  this.entityService.getAllEntityNames().subscribe((response: string[])=>{
    this.listOfParentEntities = response;
    console.log(response, "sdsds");

  });
}

  save() {
    this.entityService.save(this.entityForm.value).subscribe((response)=>{
      alert("Entity Saved");
    }, (err)=>{
      console.log(err, "errrroooor");
    });
  }

  abortSaveAction() {
    this.router.navigate(["/entityManagement"]);
  }

}

