import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
  listOfParentEntities: string[]=[];
  filteredEntityNames: Observable<string[]>;

  constructor(public formBuilder: FormBuilder, private entityService: EntityDataService, private router: Router) {
    this.entityForm = new FormGroup({
      name: new FormControl('',[Validators.pattern("[a-zA-Z0-9_-]*"), Validators.pattern(/^\S*$/),
      Validators.minLength(6), Validators.maxLength(35)]),
      entityCode: new FormControl('', [Validators.pattern("[a-zA-Z0-9_-]*"), Validators.pattern(/^\S*$/),
      Validators.minLength(6), Validators.maxLength(35)]),
      parent: new FormControl('', Validators.required),
      description: new FormControl('', [
      Validators.minLength(6), Validators.maxLength(140)]),
      enableFlag: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.getAllEntityNames();
    this.getFilteredEntityNames();
    
  }


getAllEntityNames(){
  this.entityService.getAllEntityNames().subscribe((response: string[])=>{
    this.listOfParentEntities = response;
  });
}


getFilteredEntityNames(){
  this.filteredEntityNames = this.entityForm.controls.parent.valueChanges
  .pipe(
    startWith(''),
    map(entityName => entityName ? this.filterEntities(entityName) : this.listOfParentEntities.slice())
  );
}


  save() {
    this.entityService.save(this.entityForm.value).subscribe((data: {savedEntityObject: Object, message: string}) => {
      this.entityService.openDialog(
         "success",
        data.message
       ).subscribe((result)=>{
       this.router.navigate(['entityManagement']);
       });
  
     }, (err)=>{
      this.entityService.openDialog(
        "error",
       err.error.message+"."
      ).subscribe((result)=>{
        console.log(err, "errrroooor");

      });
    });
  }

  
  private filterEntities(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.listOfParentEntities.filter(entityName => entityName.toLowerCase().indexOf(filterValue) === 0);
  }

  
  abortSaveAction() {
    console.log(this.entityForm);
    this.router.navigate(["/entityManagement"]);
  }




}

