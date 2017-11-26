import { IAddress } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MdSnackBar } from '@angular/material';

import { TdDialogService, TdLoadingService } from '@covalent/core';

import { UserService, IUser } from '../services/user.service';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'ag-user-form',
  templateUrl: './form.component.html'
})
export class UsersFormComponent implements OnInit {

  id: string;
  email: string;
  name: string;
  username: string;
  password: string;
  admin: boolean;
  action: string;

  user: IUser;
  address: IAddress;

  constructor(private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBarService: MdSnackBar,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService) { }

  goBack(): void {
    this._router.navigate(['/users']);
  }

  ngOnInit(): void {
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[1].path : 'add');
    });
    this._route.params.subscribe((params: { id: string }) => {
      this.id = params.id;
      if (this.id) {
        this.load();
      }
    });
  }

  async load(): Promise<void> {
    try {
      this._loadingService.register('user.form');

      let user: IUser = await this._userService.get(this.id).toPromise();
      this.name = user.name;
      this.username = user.local.username;
      this.email = user.email;
      this.admin = user.admin;
      this.address = user.address;

    } catch (error) {
      this._dialogService.openAlert({ message: 'Houve um erro ao carregar o usuário.' });
    } finally {
      this._loadingService.resolve('user.form');
    }
  }

  async save(): Promise<void> {
    try {
      this._loadingService.register('user.form');

      let now: Date = new Date();

      this.user = {
        id: this.id,
        email: this.email,
        name: this.name,
        admin: this.admin,
        local: {
          username: this.username
        },
        address: this.address,
        createdAt: now,
        updatedAt: now
      };

      if (this.id !== '' && this.password !== '') {
        this.user.local.password = this.password;
      }

      if (this.action === 'add') {
        this.user.address = {
          country: '',
          state: '',
          city: '',
          street: '',
          number: 0
        };

        await this._userService.create(this.user).toPromise();
      } else {
        await this._userService.update(this.id, this.user).toPromise();
      }

      this._snackBarService.open('Usuário ' + (this.action === 'add' ? 'Cadastrado' : 'Atualizado'), 'Ok');
      this.goBack();
    } catch (error) {
      this._dialogService.openAlert({ message: 'Houve um erro ao salvar o usuário.' });
    } finally {
      this._loadingService.resolve('user.form');
    }
  }
}
