import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-starter-header',
  templateUrl: './starter-header.component.html',
  styleUrls: ['./starter-header.component.css']
})
export class StarterHeaderComponent implements OnInit {
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];
  constructor() { }

  ngOnInit() {
  }

  sideBarmenu(){
  //  console.log(this.body.classList.toggle;
    this.body.classList.toggle('sidebar-collapse');
  }

logout(){
  
}

}
