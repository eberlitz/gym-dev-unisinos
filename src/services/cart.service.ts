import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpInterceptorService } from '@covalent/http';

@Injectable()
export class CartService {

  products = [];

  get total() {
    return this.products.reduce((a, b) => a + (b.qtde * b.price), 0);
  }

  constructor(private _http: HttpInterceptorService) {
    this.load();
  }

  async find(id) {
    return this.products.find((a) => a.id === id);
  }

  async add(product) {
    let item = await this.find(product._id);
    if (item) {
      item.qtde++;
    } else {
      item = {
        id: product._id,
        price: product.price,
        qtde: 1,
        name: product.name,
        description: product.description
      };
      this.products.push(item);
    }
    this.save();
  }

  async remove(product: any) {
    const idx = this.products.indexOf(product);
    // tslint:disable-next-line:no-bitwise
    if (~idx) {
      this.products.splice(idx, 1);
      this.save();
    }
  }

  async removeAll() {
    this.products.splice(0);
  }

  save() {
    localStorage.setItem('cart.products', JSON.stringify(this.products));
  }

  load() {
    const data = localStorage.getItem('cart.products');
    this.products = data ? JSON.parse(data) : [];
  }

  async finalize() {
    this.removeAll();
    // this.products;
    // tslint:disable-next-line:no-console
    console.log('send to backend');
  }
}
