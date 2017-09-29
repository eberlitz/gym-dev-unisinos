import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TdLoadingService } from '@covalent/core';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../users/services/user.service';
import { HttpInterceptorService } from '@covalent/http';

@Component({
  selector: 'qs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  name: string = '';
  email: string = '';
  username: string = '';
  password: string = '';

  constructor(
    private _router: Router,
    private _loadingService: TdLoadingService,
    private _authService: AuthService,
    private _http: HttpInterceptorService,
  ) {
  }

  async register() {
    try {
      this._loadingService.register();

      const user = <IUser>{
        name: this.name,
        email: this.email,
        local: {
          username: this.username,
          password: this.password
        }
      };

      await this._http.post('~/register', JSON.stringify(user))
        .map((a) => a.json())
        .toPromise();

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
}
