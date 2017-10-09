import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ag-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any[] = [{}, {}];

  constructor() { }

  ngOnInit() {
  }

}
