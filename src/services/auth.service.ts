// tslint:disable:typedef
import { RoutesRecognized } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptorService } from '@covalent/http';

@Injectable()
export class AuthService implements CanActivate {

  get user() {
    if (this.isLoggedIn()) {
      return this.readToken();
    } else {
      return null;
    }
  }

  private code: string;

  constructor(
    private router: Router,
    private _http: HttpInterceptorService,
  ) {
    if (!this.code) {
      this.code = this.extractCode();
      if (this.code) {
        this.removeFacebookHash();
      }
    }
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn: boolean = this.isLoggedIn();
    if (!isLoggedIn && !this.code) {
      this.logout();
    }
    if (this.code) {
      return this.loginProvider();
    }
    return isLoggedIn;
  }

  async getMe() {
    if (this.isLoggedIn()) {
      return await this._http.get('~/api/me')
        .map((a) => a.json())
        .toPromise();
    }
    return null;
  }

  async auth(provider: string, options?: any) {
    localStorage.setItem('provider', provider);
    if (provider === 'local') {
      const { access_token } = await this._http.post('~/auth/local', JSON.stringify(options))
        .map((a) => a.json())
        .toPromise();
      localStorage.setItem('token', access_token);
      return true;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  protected readToken() {
    let jwt: string = localStorage.getItem('token');
    const jwtHelper = new JwtHelper();
    return jwtHelper.decodeToken(jwt);
  }

  private loginProvider(): Promise<boolean> {
    return Promise.reject('Not Implemented yet');
  }

  private isLoggedIn(): boolean {
    // Check if there's an unexpired JWT
    let jwt: string = localStorage.getItem('token');
    return !!jwt && !this.tokenNotExpired(jwt, 10);
  }

  private tokenNotExpired(jwt: string, offsetSeconds?: number) {
    const jwtHelper = new JwtHelper();
    let date = jwtHelper.getTokenExpirationDate(jwt);
    offsetSeconds = offsetSeconds || 0;
    if (date === null) {
      return false;
    }
    // Token expired?
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
  }

  private extractCode() {
    const query = location.href.split('?')[1];
    if (query) {
      let params = new URLSearchParams(query);
      return params.get('code');
    }
  }

  private removeFacebookHash() {
    // Remove the ugly Facebook appended hash
    // <https://github.com/jaredhanson/passport-facebook/issues/12>
    if (window.location.hash && window.location.hash === '#_=_') {
      if (window.history && history.pushState) {
        window.history.pushState('', document.title, window.location.pathname);
      } else {
        // Prevent scrolling by storing the page's current scroll offset
        const _scroll = {
          top: document.body.scrollTop,
          left: document.body.scrollLeft,
        };
        window.location.hash = '';
        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = _scroll.top;
        document.body.scrollLeft = _scroll.left;
      }
    }
  }
}

// Avoid TS error "cannot find name escape"
declare var escape: any;

class JwtHelper {

  public urlBase64Decode(str: string) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: { break; }
      case 2: { output += '=='; break; }
      case 3: { output += '='; break; }
      default: {
        throw new Error('Illegal base64url string!');
      }
    }
    return decodeURIComponent(escape(typeof window === 'undefined'
      ? atob(output)
      : window.atob(output)));
    // polyfill https://github.com/davidchambers/Base64.js
  }

  public decodeToken(token: string) {
    let parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }

    let decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }

    return JSON.parse(decoded);
  }

  public getTokenExpirationDate(token: string) {
    let decoded: any;
    decoded = this.decodeToken(token);

    if (typeof decoded.exp === 'undefined') {
      return null;
    }

    let date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  public isTokenExpired(token: string, offsetSeconds?: number) {
    let date = this.getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;
    if (date === null) {
      return false;
    }

    // Token expired?
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
  }
}
