import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { FeaturesService, IFeature } from '../../../../services';

@Component({
  selector: 'ag-feature-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  viewProviders: [FeaturesService],
})
export class FeaturesFormComponent implements OnInit {

  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  enabled: boolean;
  feature: IFeature;

  action: string;

  constructor(private _featuresService: FeaturesService, private _route: ActivatedRoute) { }

  goBack(): void {
    window.history.back();
  }

  ngOnInit(): void {
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[1].path : 'add');
    });
    this._route.params.subscribe((params: { id: string }) => {
      this.id = params.id;
      this._featuresService.get(this.id).subscribe((feature: IFeature) => {
        Object.assign(this, feature);
        // this.id = feature.id;
        // this.title = feature.name;
        // this.user = feature.user;
        // this.enabled = (feature.enabled === 1 ? true : false);
      });
    });
  }

  save(): void {
    let now: Date = new Date();
    this.feature = <IFeature>{
      name: this.name,
      description: this.description,
      enabled: this.enabled,
      price: this.price,
      stock: this.stock,
    };

    if (this.action === 'add') {
      this._featuresService.create(this.feature).subscribe(() => {
        this.goBack();
      });
    } else {
      this._featuresService.update(this.id, this.feature).subscribe(() => {
        this.goBack();
      });
    }
  }
}
