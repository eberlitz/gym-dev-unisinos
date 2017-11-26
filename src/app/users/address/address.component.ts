import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MdSnackBar } from '@angular/material';

import { TdDialogService, TdLoadingService } from '@covalent/core';

import { UserService, IUser } from '../services/user.service';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'ag-user-address-form',
  templateUrl: './address.component.html'
})
export class UsersAddressFormComponent implements OnInit {

  id: string;
  country: string;
  state: string;
  city: string;
  street: string;
  number: number;

  user: IUser;

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
    this._route.params.subscribe((params: { id: string }) => {
      this.id = params.id;
      if (this.id) {
        this.load();
      }
    });
  }

  async load(): Promise<void> {
    try {
      this._loadingService.register('user.address');

      this.user = await this._userService.get(this.id).toPromise();

      this.country = this.user.address.country;
      this.state = this.user.address.state;
      this.city = this.user.address.city;
      this.street = this.user.address.state;
      this.number = this.user.address.number;

    } catch (error) {
      this._dialogService.openAlert({ message: 'Houve um erro ao carregar o endereço.' });
    } finally {
      this._loadingService.resolve('user.address');
    }
  }

  async save(): Promise<void> {
    try {
      this._loadingService.register('user.address');

      this.user.address = {
        country: this.country,
        state: this.state,
        city: this.city,
        street: this.street,
        number: this.number
      };

      await this._userService.update(this.id, this.user).toPromise();

      this._snackBarService.open('Endereço atualizado', 'Ok');
      this.goBack();
    } catch (error) {
      this._dialogService.openAlert({ message: 'Houve um erro ao salvar o endereço.' });
    } finally {
      this._loadingService.resolve('user.address');
    }
  }
}
