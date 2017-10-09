import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users.component';
import { UsersFormComponent } from './form/form.component';
import { AdminService } from '../../services/admin.service';

const routes: Routes = [{
  path: 'users',
  canActivate: [AdminService],
  children: [{
    path: '',
    component: UsersComponent,
  }, {
    path: 'add',
    component: UsersFormComponent,
  }, {
    path: ':id/edit',
    component: UsersFormComponent,
  }],
}];

export const userRoutes: ModuleWithProviders = RouterModule.forChild(routes);
