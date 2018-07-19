import { Component, OnInit } from '@angular/core';
import { SandstormGlobalVariablesService } from '../../shared/sandstorm-global-variables.service';


@Component({
  selector: 'app-starter-content',
  templateUrl: './starter-content.component.html',
  styleUrls: ['./starter-content.component.css']
})
export class StarterContentComponent implements OnInit {

user: any;

  constructor(private globalVariableService: SandstormGlobalVariablesService) { }


  ngOnInit() {
this.user = this.globalVariableService.currentUser;  
  }

}
