import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-role-entity',
  templateUrl: './view-role-entity.component.html',
  styleUrls: ['./view-role-entity.component.css']
})
export class ViewRoleEntityComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }


  updateRole()
{
this.router.navigate(['updateRole']);
}

}
