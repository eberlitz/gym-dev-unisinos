import { Component, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

import { TdMediaService } from '@covalent/core';

@Component({
  selector: 'ag-dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.scss'],
})
export class DashboardProductComponent implements AfterViewInit, OnInit {

  title: string;
  constructor(private _titleService: Title,
              private _changeDetectorRef: ChangeDetectorRef,
              public media: TdMediaService) { }

  ngOnInit(): void {
    this._titleService.setTitle( 'Cadastro de produtos' );
    this.title = this._titleService.getTitle();
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    // force a new change detection cycle since change detections
    // have finished when `ngAfterViewInit` is executed
    this._changeDetectorRef.detectChanges();
  }
}
