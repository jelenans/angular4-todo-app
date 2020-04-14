import {Component, OnInit} from '@angular/core';

import { Item } from '../models/item.model';
import { ItemsService } from '../services/items.service';

@Component({
  selector:'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit{
  item: Item;
  items: Item[];

  constructor(private itemService: ItemsService){}

  /**
   *  Fetches the current items
   */
  ngOnInit() {
    this.getItems();
  }


  /**
   *  Adds the item to the list
   *
   * @param  {string} name
   * @return {void}
   */
  addItem(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.itemService.addItem({ name } as Item).subscribe(
      item => this.items.push(item)
    );
  }

  /**
   * Deletes the item from the list
   *
   * @param  {Item} item
   * @return {void}
   */
  deleteItem(item: Item): void {
    this.itemService.deleteItem(item).subscribe(
      item => this.getItems()
    );
  }

  /**
   * Gets the list of items
   *
   * @return {void}
   */
  getItems(): void {
    this.itemService.getItems().subscribe(
      items => this.items = items
    );
  }
}
