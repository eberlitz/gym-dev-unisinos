import { Component, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MdSnackBar } from '@angular/material';

import { TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';

import { UserService, IUser } from './services/user.service';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'ag-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements AfterViewInit, OnInit {

  users: IUser[];
  filteredUsers: IUser[];

  constructor(private _titleService: Title,
    private _loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _snackBarService: MdSnackBar,
    private _userService: UserService,
    private _changeDetectorRef: ChangeDetectorRef,
    public media: TdMediaService) {
  }

  ngOnInit(): void {
    this._titleService.setTitle('Usuários');
    this.load();
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    // force a new change detection cycle since change detections
    // have finished when `ngAfterViewInit` is executed
    this._changeDetectorRef.detectChanges();
  }

  filterUsers(name: string = ''): void {
    this.filteredUsers = this.users.filter((user: IUser) => {
      return user.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
    });
  }

  async load(): Promise<void> {
    try {
      this._loadingService.register('users.list');
      this.users = await this._userService.query().toPromise();
    } catch (error) {
      this.users = await this._userService.staticQuery().toPromise();
    } finally {
      this.filteredUsers = Object.assign([], this.users);
      this._loadingService.resolve('users.list');
    }
  }

  delete(id: string): void {
    this._dialogService
      .openConfirm({ message: 'Tem certeza que deseja excluir este usuário?' })
      .afterClosed().toPromise().then((confirm: boolean) => {
        if (confirm) {
          this._delete(id);
        }
      });
  }

  private async _delete(id: string): Promise<void> {
    try {
      this._loadingService.register('users.list');
      await this._userService.delete(id).toPromise();
      this.users = this.users.filter((user: IUser) => {
        return user.id !== id;
      });
      this.filteredUsers = this.filteredUsers.filter((user: IUser) => {
        return user.id !== id;
      });
      this._snackBarService.open('Usuário excluído', 'Ok');
    } catch (error) {
      this._dialogService.openAlert({ message: 'Houve um erro ao tentar excluir o usuário.' });
    } finally {
      this._loadingService.resolve('users.list');
    }
  }

}
