import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpInterceptorService, RESTService } from '@covalent/http';
import { MOCK_API } from '../config/api.config';

export interface IFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class FeaturesService extends RESTService<IFeature> {

  constructor(private _http: HttpInterceptorService) {
    super(_http, {
      baseUrl: '~/api',
      path: '/products',
    });
  }

  staticQuery(): Observable<IFeature[]> {
    return new Observable<IFeature[]>((sub) => {
      sub.next([]);
      sub.complete();
    });
    // return this._http.get('data/features.json')
    //   .map((res: Response) => {
    //     return res.json();
    //   });
  }
}
