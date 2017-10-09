import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { HttpInterceptorService } from '@covalent/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AdminService extends AuthService {

  constructor(
    private _router: Router,
    _http: HttpInterceptorService,
  ) {
    super(_router, _http);
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const can = super.canActivate(route, state);
    if (!can) {
      return false;
    }
    let isAdmin = this.user.admin;
    if (!isAdmin) {
      this._router.navigate(['/']);
    }
    return isAdmin;
  }
}
