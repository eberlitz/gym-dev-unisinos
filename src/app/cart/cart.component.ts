import { Router } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { Title } from '@angular/platform-browser';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FeaturesService } from 'services/features.service';
import { TdLoadingService } from '@covalent/core/loading/services/loading.service';
import { ITdDataTableColumn } from '@covalent/core';

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'ag-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  columns: ITdDataTableColumn[] = [
    { name: 'name', label: 'Produto' },
    { name: 'description', label: 'Descrição' },
    { name: 'price', label: 'Preço', numeric: true, format: DECIMAL_FORMAT },
  ];
  items: any[] = [];

  constructor(
    private _loadingService: TdLoadingService,
    private _titleService: Title,
    public cart: CartService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._titleService.setTitle('Carrinho');
    this.items = this.cart.products;
  }

  removeItem(item) {
    this.cart.remove(item);
  }

  removeAll() {
    this.cart.removeAll();
  }

  getTotal() {
    return DECIMAL_FORMAT(this.cart.total);
  }

  async finalize() {
    try {
      await this.cart.finalize();
      this._router.navigate(['/finalize']);
    } catch (error) {
      // todo
    }
  }

}
