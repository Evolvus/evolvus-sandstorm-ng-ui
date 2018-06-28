import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EntityDataService } from '../entity-data.service';
import { EntityModel } from '../entity.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-entity',
  templateUrl: './update-entity.component.html',
  styleUrls: ['./update-entity.component.css']
})
export class UpdateEntityComponent implements OnInit {


  entityForm: FormGroup;
  entityData: EntityModel;
  listOfParentEntities: string[] = [];
  filteredEntityNames: Observable<string[]>;

  constructor(private entityService: EntityDataService, private router: Router, private route: ActivatedRoute) { 
    this.entityForm = new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(35)
      ])),
      entityCode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(35)
      ])),
      parent: new FormControl('', Validators.compose([
        Validators.required
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(140)
      ])),
      enableFlag: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });


 
  }

  ngOnInit() {
    this.filteredEntityNames = this.entityForm.controls.parent.valueChanges
    .pipe(
      startWith(''),
      map(entityName => entityName ? this.filterEntities(entityName) : this.listOfParentEntities.slice())
    );
    this.getAllEntityNames();

    var entityId = this.route.snapshot.params['id'];
    this.entityService.getOneEntityData(entityId)
    .subscribe((response: EntityModel)=>{
     this.entityData = response;
    console.log(this.entityData);
     this.entityForm.patchValue({
      
       enableFlag: response.enableFlag,
       name: response.name,
       entityCode: response.entityCode,
       description: response.description,
       parent: response.parent
     });
  }

 );
  console.log(this.entityForm);
  }
  getAllEntityNames(){
    this.entityService.getAllEntityNames().subscribe((response: string[])=>{
      this.listOfParentEntities = response;
  
    });
  }

  private filterEntities(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listOfParentEntities.filter(entityName => entityName.toLowerCase().indexOf(filterValue) === 0);
  }

  update() {
    this.entityData.description = this.entityForm.value.description;
    this.entityData.name = this.entityForm.value.name;
    this.entityData.enableFlag = this.entityForm.value.enableFlag;
    this.entityData.processingStatus = this.entityForm.value.processingStatus;
    this.entityData.parent = this.entityForm.value.parent;

    this.entityService.update(this.entityData).subscribe((response)=>{
      console.log("resp", response);
      alert("Entity Updated");
    }, (err)=>{
      console.log(err, "errrroooor");
    });
  }

  abortUdpateAction(){
    var tempStatus = "";
    // if(this.entityForm.touched){
      // tempStatus = this.entityService.openDialog("alert", "All the changes will be discarded, click OK to continue!");
      // if(tempStatus === "success"){
        this.router.navigate(['viewEntity', this.entityData.entityId]);  
      // }
    // }else{
      // this.router.navigate(['viewRole', this.entityData.entityId]);  
    // }
  
  }
}
