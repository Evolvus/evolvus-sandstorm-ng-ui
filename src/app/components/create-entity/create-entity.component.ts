import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EntityService } from '../../shared/services/entityservice';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-create-entity',
  templateUrl: './create-entity.component.html',
  styleUrls: ['./create-entity.component.css']
})


export class CreateEntityComponent implements OnInit {

  entityToSave: Entity;
  createEntity: FormGroup;
  ValidationMsgs: any;
  parentEntities: any;
  parentEntitySelect: Entity;
  platformURL = environment.platformURL;

  constructor(public http: HttpClient, public formBuilder: FormBuilder, public entityService: EntityService) {
    this.createEntity = new FormGroup({
      entityName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_-]+$"),
        Validators.minLength(6),
        Validators.maxLength(35)
      ])),
      entityCode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_-]+$"),
        Validators.minLength(6),
        Validators.maxLength(35)
      ])),
      parentEntity: new FormControl('', Validators.compose([
        Validators.required
      ])),
      entityDescription: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_-]+$"),
        Validators.minLength(6),
        Validators.maxLength(140)
      ])),
      entityStatus: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });

    this.ValidationMsgs = {
      entityName: [
        { type: "required", message: "Entity name is required" },
        { type: "pattern", message: "Enter a valid Entity Name" },
        { type: "minlength", message: "Enter a valid Entity Name" },
        { type: "maxlength", message: "Enter a valid Entity Name" },
      ],
      entityCode: [
        { type: "required", message: "Entity Code is required" },
        { type: "pattern", message: "Enter a valid Entity Code" },
        { type: "minlength", message: "Enter a valid Entity Code" },
        { type: "maxlength", message: "Enter a valid Entity Code" }
      ],
      parentEntity: [
        { type: "required", message: "Invalid Parent Entity" }],
      entityDescription: [
        { type: "required", message: "Entity Description is required" },
        { type: "pattern", message: "Enter a valid Entity Description" },
        { type: "minlength", message: "Enter a valid Entity Description" },
        { type: "maxlength", message: "Enter a valid Entity Description" },
      ],
      entityStatus: [{ type: "required", message: "Select a valid Entity Status" },]
    };
  }

  ngOnInit() {
    this.entityService.fetchAllEntities();
    this.entityService.allEntityExport.subscribe((entityData) => {
      this.parentEntities = entityData;
    })
  }


  saveEntity(createEntityForm) {
    this.parentEntitySelect = this.parentEntities.filter(value => createEntityForm.value.parentEntity === value.name);
    this.entityToSave = new Entity();
    console.log("clicked---", createEntityForm.value);
    this.entityToSave.name = createEntityForm.value.entityName;
    this.entityToSave.parent = this.parentEntitySelect[0].entityCode;
    this.entityToSave.entityCode = createEntityForm.value.entityCode;
    this.entityToSave.processingStatus = "Pending Authorization";
    this.entityToSave.level = this.parentEntitySelect[0].level + 1;
    this.entityToSave.createdBy = "";
    this.entityToSave.createdDate = new Date();
    this.entityToSave.description = createEntityForm.value.entityDescription;
    this.entityService.saveEntity(this.entityToSave);
    this.entityService.responseToBack.subscribe((data) => {
      var responseSaved = data;
      console.log("response from DB", JSON.stringify(responseSaved));
    })
  }

}

export class Entity {
  name: String;
  entityCode: String;
  level: number;
  description: String;
  createdBy: String;
  createdDate: Date;
  processingStatus: String;
  parent: String;
}
