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
  listOfParentEntityNames: string[] = [];
  listOfParentEntities: any;
  filteredEntityNames: Observable<string[]>;

  constructor(private entityService: EntityDataService, private router: Router, private route: ActivatedRoute) { 
    this.entityForm = new FormGroup({
      name: new FormControl('',[
       Validators.pattern("[a-zA-Z0-9_-]*"),
       Validators.pattern(/^\S*$/),
       Validators.minLength(6),
       Validators.maxLength(35)]),

      entityCode: new FormControl('',[
        Validators.pattern("[a-zA-Z0-9_-]*"),
        Validators.pattern(/^\S*$/),
        Validators.minLength(6),
        Validators.maxLength(35)]),
        
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
      map(entityName => entityName ? this.filterEntities(entityName) : this.listOfParentEntityNames.slice())
    );
    this.getAllEntityNames();
    var entityCode = this.route.snapshot.params['id'];
    this.entityService.getOneEntityData(entityCode)
    .subscribe((response: any)=>{
      if(response.data!=[]){
        this.entityData = response.data[0];
        this.entityForm.patchValue({
         
          enableFlag: this.entityData.enableFlag,
          name: this.entityData.name,
          entityCode: this.entityData.entityCode,
          description: this.entityData.description,
          parent: this.entityData.parent
        });
      }else{
        // no entity present with such entityCode PageNotFound 404 Error
      }
      });
  
  }
  getAllEntities(){
    this.entityService.getAllEntities(0,1).subscribe((response: any)=>{
      this.listOfParentEntities = response.data;
    });
  }

  private filterEntities(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.listOfParentEntityNames.filter(entityName => entityName.toLowerCase().indexOf(filterValue) === 0);
  }


  getAllEntityNames(){
    this.entityService.getAllEntities(0,1).subscribe((response: any)=>{
      this.listOfParentEntities = response;
      for(let entityName of response.data){{
        this.listOfParentEntityNames.push(entityName.name);
      }}
    });
  }
  

  update() {
    this.entityData.description = this.entityForm.value.description;
    this.entityData.name = this.entityForm.value.name;
    this.entityData.enableFlag = this.entityForm.value.enableFlag;
    this.entityData.processingStatus = this.entityForm.value.processingStatus;
    this.entityData.parent = this.entityForm.value.parent;

    this.entityService.update(this.entityData).subscribe((response: any)=>{
      this.entityService.openDialog(
        "success",
       response.description
      ).subscribe((result)=>{
      this.router.navigate(['entityManagement']);
      });

    }, (err)=>{
      console.log(err, "ERRRRRR");
      this.entityService.openDialog(
        "error",
       err.error.description
      ).subscribe((result)=>{
      });    
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
