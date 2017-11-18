import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpInterceptorService } from '@covalent/http';


@Injectable()
export class CartService {

  products = [];

  constructor(private _http: HttpInterceptorService) {
    this.load();
  }

  async add(product) {
    this.products.push(product);
    this.save();
  }

  async remove(product: any) {
    const idx = this.products.indexOf(product);
    // tslint:disable-next-line:no-bitwise
    if (~idx) {
      this.products.splice(idx, 1);
    }
  }

  save() {
    localStorage.setItem('cart.products', JSON.stringify(this.products));
  }

  load() {
    const data = localStorage.getItem('cart.products');
    this.products = data ? JSON.parse(data) : [];
    this.save();
  }
}
