import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Item }         from '../models/item.model';
import { ItemsService }  from '../services';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: [ './item-detail.component.css' ]
})
export class ItemDetailComponent implements OnInit {

  item: Item;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemsService,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => this.getItem(params)
    );
  }

  /**
   * Gets a to-do Item by id.
   *
   * @param  {any} params
   * @return {void}
   */
  getItem(params: any): void {

    let id = params.get('id');
    this.itemService.getItem(+id).subscribe(
      item => {this.item = item;}
    );
  }


  /**
   * Returns to the previous page
   *
   * @return {void}
   */
  goBack(): void {
    this.location.back();
  }


  /**
   * Updates the current to-do item
   * @return {void}
   */
  save(): void {
    this.itemService.updateItem(this.item).subscribe(
      () => this.goBack()
    );
  }

}
