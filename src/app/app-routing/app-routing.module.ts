import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router/src/config';
import { StarterContentComponent } from '../components/starter-content/starter-content.component';
import { ListRolesEntityComponent } from '../components/role-management/list-roles-entity/list-roles-entity.component';
import { AddRoleEntityComponent } from '../components/role-management/add-role-entity/add-role-entity.component';
import { ViewRoleEntityComponent } from '../components/role-management/view-role-entity/view-role-entity.component';
import { UserManagementComponent } from '../components/user-management/user-management.component';
import { AddUserComponent } from '../components/add-user/add-user.component';
import { ViewUserComponent } from '../components/view-user/view-user.component';
import { SaveApplicationEntityComponent } from '../components/application-management/save-application-entity/save-application-entity.component';
import { ListApplicationsEntityComponent } from '../components/application-management/list-applications-entity/list-applications-entity.component';
import { UpdateApplicationEntityComponent } from '../components/application-management/update-application-entity/update-application-entity.component';
import { ViewApplicationEntityComponent } from '../components/application-management/view-application-entity/view-application-entity.component';
import { UpdateRoleEntityComponent } from '../components/role-management/update-role-entity/update-role-entity.component';
import { ListEntityComponent } from '../components/entity-management/list-entity/list-entity.component';
import { AddEntityComponent } from '../components/entity-management/add-entity/add-entity.component';
import { ViewEntityComponent } from './../components/entity-management/view-entity/view-entity.component';
import { UpdateEntityComponent } from '../components/entity-management/update-entity/update-entity.component';

const routes: Routes =[
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: StarterContentComponent},
  { path: 'applicationManagement', component: ListApplicationsEntityComponent },
  { path: 'createApplication', component: SaveApplicationEntityComponent },
  { path: 'viewApplication/:id', component: ViewApplicationEntityComponent },
  { path: 'updateApplication/:id', component: UpdateApplicationEntityComponent },
  { path: 'roleManagement', component: ListRolesEntityComponent },
  { path: 'addRole', component: AddRoleEntityComponent },
  { path: 'viewRole/:id', component: ViewRoleEntityComponent },
  { path: 'updateRole/:id', component: UpdateRoleEntityComponent},
  { path: 'userManagement', component: UserManagementComponent },
   { path: 'adduser', component: AddUserComponent },
   { path: 'viewuser', component: ViewUserComponent },
   { path: 'entityManagement', component: ListEntityComponent },
   { path: 'addEntity', component: AddEntityComponent },
   { path: 'viewEntity/:id', component: ViewEntityComponent },
   { path: 'updateEntity/:id', component: UpdateEntityComponent }

];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
