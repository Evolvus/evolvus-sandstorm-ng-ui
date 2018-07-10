import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { EntityDataService } from '../entity-data.service';

@Component({
  selector: 'app-view-entity',
  templateUrl: './view-entity.component.html',
  styleUrls: ['./view-entity.component.css']
})
export class ViewEntityComponent implements OnInit {



  entityId: string = "";
  selectedEntity: any;

  constructor(private route: ActivatedRoute, private router: Router, private entityService: EntityDataService) { }

  ngOnInit() {
    
    this.entityId = "" + this.route.snapshot.params['id'];
    this.entityService.getOneEntityData(this.entityId).subscribe((entityData: any)=>{
      // console.log(entityData, "entityData");

      this.selectedEntity = entityData.data[0];
    }, (err)=>{

      alert("No Entities");
    })
  }


  updateEntity(){
    this.router.navigate(['/updateEntity', this.selectedEntity.entityCode]);
    }
  
  abortViewAction(){
    this.router.navigate(['/entityManagement']);
      }

}
