import { Provider, SkipSelf, Optional, InjectionToken } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpInterceptorService, RESTService } from '@covalent/http';

export interface IAddress {
  country: string;
  state: string;
  city: string;
  street: string;
  number: number;
}

export interface IUser {
  id?: string;
  name: string;
  email: string;
  admin: boolean;
  local: {
    username: string;
    password?: string;
  };
  address: IAddress;
  createdAt: Date;
  updatedAt: Date;
}

export class UserService extends RESTService<IUser> {

  constructor(private _http: HttpInterceptorService, api: string) {
    super(_http, {
      baseUrl: '~/api/',
      path: '/users',
    });
  }

  staticQuery(): Observable<IUser[]> {
    return this._http.get('data/users.json')
      .map((res: Response) => {
        return res.json();
      });
  }
}

export const USERS_API: InjectionToken<string> = new InjectionToken<string>('USERS_API');

export function USER_PROVIDER_FACTORY(
  parent: UserService, interceptorHttp: HttpInterceptorService, api: string): UserService {
  return parent || new UserService(interceptorHttp, api);
}

export const USER_PROVIDER: Provider = {
  // If there is already a service available, use that. Otherwise, provide a new one.
  provide: UserService,
  deps: [[new Optional(), new SkipSelf(), UserService], HttpInterceptorService, USERS_API],
  useFactory: USER_PROVIDER_FACTORY,
};
