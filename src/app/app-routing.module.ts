import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardProductComponent } from './dashboard-product/dashboard-product.component';
import { ProductFeaturesComponent } from './dashboard-product/overview/product.component';
import { FeaturesFormComponent } from './dashboard-product/overview/form/form.component';
import { LogsComponent } from './logs/logs.component';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';
import { AuthService } from '../services/auth.service';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { AdminService } from '../services/admin.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthService],
    children: [
      {
        path: '',
        component: ProductsComponent,
      },
      {
        path: 'product',
        component: DashboardProductComponent,
        children: [
          {
            path: '',
            component: ProductFeaturesComponent
          },
          {
            path: '',
            component: ProductFeaturesComponent
          },
          {
            path: 'add',
            component: FeaturesFormComponent
          },
          {
            path: ':id/delete',
            component: FeaturesFormComponent
          },
          {
            path: ':id/edit',
            component: FeaturesFormComponent
          }
        ]
      },
      {
        path: 'item/:id',
        component: DetailComponent
      },
      {
        path: 'logs',
        component: LogsComponent
      },
      {
        path: 'form',
        component: FormComponent
      },
      { path: '', loadChildren: './users/users.module#UsersModule' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
export const routedComponents: any[] = [
  MainComponent, LoginComponent,
  DashboardComponent, DashboardProductComponent,
  FormComponent, LogsComponent, DetailComponent,
  FeaturesFormComponent, ProductFeaturesComponent
];
