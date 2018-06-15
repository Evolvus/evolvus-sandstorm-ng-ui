import { RoleModel } from './../role-model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-view-role-entity',
  templateUrl: './view-role-entity.component.html',
  styleUrls: ['./view-role-entity.component.css']
})
export class ViewRoleEntityComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }
  platformURL = environment.platformURL;
  role: RoleModel;
  ngOnInit() {

    this.http.get(`${this.platformURL}/role/find/` +  this.route.snapshot.params['id'])
      .subscribe((response: RoleModel) => {
        // this.role = response;
        console.log("response");
        console.log(response);
      });

      // this.http.get(`${this.platformURL}/roleTypeMenuItemMap/find/` +  this.route.snapshot.params['id'])
      // .subscribe((response: RoleModel) => {
      //   this.role = response;
      //   console.log(response);
      // });
  }



  updateRole()
{
this.router.navigate(['updateRole']);
}

}
