import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { ItemsService } from '../services';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  private items: Item[] = [];
  items$: Observable<Item[]>;
  private searchTerms = new Subject<string>();

  constructor(private itemService: ItemsService) {
  }

  ngOnInit() {
    this.getItems();

    this.items$ = this.searchTerms.pipe(
    // wait 300ms after each keystroke before considering the term
    debounceTime(300),

    // ignore new term if same as previous term
    distinctUntilChanged(),

    // switch to new search observable each time the term changes
    switchMap((term: string) => this.itemService.searchItems(term)),
    );
  }

  /**
   * Gets the list of items
   *
   * @return {void}
   */
  getItems(): void {
    this.itemService.getItems().subscribe(
      items => this.items = items.slice(1,5)
    );
  }


  /**
   * Seraches through list of items
   * @param {string} term
   * @return {void}
   */
  search(term: string): void {
    this.searchTerms.next(term);
  }
}
