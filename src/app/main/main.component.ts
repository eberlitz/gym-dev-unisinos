import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ag-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isAdmin: boolean;
  userName: string;
  userEmail: string;

  routes: Object[] = [
      {
      title: 'Produtos',
      route: '/',
      icon: 'dashboard',
    },
    // {
    //   title: 'Product Dashboard',
    //   route: '/product',
    //   icon: 'view_quilt',
    // }, {
    //   title: 'Product Logs',
    //   route: '/logs',
    //   icon: 'receipt',
    // },
    {
      title: 'Usuários',
      route: '/users',
      icon: 'people',
      admin: true
    }, {
      title: 'Gerenciar produtos',
      route: '/product/features',
      icon: 'people',
      admin: true
    }
  ];

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  async ngOnInit() {
    const user = await this._authService.getMe();
    this.userName = user.name;
    this.userEmail = user.email;
    this.isAdmin = user.admin;
  }

  logout(): void {
    this._authService.logout();
  }
}
