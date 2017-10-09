import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TdLoadingService } from '@covalent/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ag-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  username: string = 'admin';
  password: string = 'admin';

  constructor(
    private _router: Router,
    private _loadingService: TdLoadingService,
    private _authService: AuthService,
  ) { }

  async login() {
    try {
      this._loadingService.register();

      await this._authService.auth('local', {
        username: this.username,
        password: this.password
      });

      this._router.navigate(['/']);
    } catch (error) {
      alert(error);
    } finally {
      this._loadingService.resolve();
    }
  }

  register() {
    this._router.navigate(['/register']);
  }
}
