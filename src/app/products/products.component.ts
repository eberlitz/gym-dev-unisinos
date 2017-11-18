import { CartService } from './../../services/cart.service';
import { Title } from '@angular/platform-browser';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FeaturesService } from 'services/features.service';
import { TdLoadingService } from '@covalent/core/loading/services/loading.service';

@Component({
  selector: 'ag-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  viewProviders: [FeaturesService]
})
export class ProductsComponent implements OnInit {
  filteredProducts: any[];

  products: any[] = [];

  constructor(
    private _productsService: FeaturesService,
    private _loadingService: TdLoadingService,
    private _titleService: Title,
    public cart: CartService
  ) { }

  ngOnInit() {
    this._titleService.setTitle('Product Features');
    this.loadProducts();
  }

  loadProducts(): void {
    this._loadingService.register('products.list');
    this._productsService.query().subscribe((products: any[]) => {
      this.products = products;
      this.filteredProducts = products;
      this._loadingService.resolve('products.list');
    }, (error: Error) => {
      this._productsService.staticQuery().subscribe((products: any[]) => {
        this.products = products;
        this.filteredProducts = products;
        this._loadingService.resolve('products.list');
      });
    });
  }

  addToCart(product) {
    this.cart.add(product);
  }

}
