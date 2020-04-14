import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Item, ItemEntity } from '../models/item.model';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ItemsService {

  private itemsUrl = 'api/items';

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}


  /**
   * Fetches a list of to-do Items from the server
   *
   * @return {Observable<Item[]>}
   */
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl).pipe(
      tap(Items => this.log(`fetched Items`)),
      catchError(this.handleError('getItems', []))
    );
  }

  /**
   * Fetches a to-do Item by id. Returns 404 if not found
   *
   * @param  {number} id
   * @return {Observable<Item>}
   */
  getItem(id: number): Observable<Item> {
    const url = this.itemsUrl + '/' + id;
    return this.http.get<Item>(url).pipe(
      tap(_ => this.log(`fetched Item id=${id}`)),
      catchError(this.handleError<Item>(`getItem id=${id}`))
    );
  }

  /**
   * Updates a to-do Item on the server
   *
   * @param  {Item} Item
   * @return {Observable<any>}
   */
  updateItem (Item: Item): Observable<any> {
    return this.http.put(this.itemsUrl, Item, httpOptions).pipe(
      tap(_ => this.log(`updated Item id=${Item.id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }

  /**
   * Adds a new to-do Item to the server
   *
   * @param  {Item} Item
   * @return {Observable<Item>}
   */
  addItem (Item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, Item, httpOptions).pipe(
      tap((Item: Item) => this.log(`added Item w/ id=${Item.id}`)),
      catchError(this.handleError<Item>('addItem'))
    );
  }

  /**
  * Deletes the to-do Item from the server
  *
  * @param  {Item | number} id
  * @return {Observable<Item>}
  */
  deleteItem (item: Item | number): Observable<Item> {
    const id = typeof ItemEntity === 'number' ? item : (<Item>item).id;
    const url = this.itemsUrl + '/' + id;

    return this.http.delete<Item>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Item id=${id}`)),
      catchError(this.handleError<Item>('deleteItem'))
    );
  }

  /**
  * Fetch the to-do Item which contain the search term
  *
  * @param  {string} term
  * @return {Observable<Item>}
  */
  searchItems(term: string): Observable<Item[]> {
    if (!term.trim()) {
      // if not search term, return empty Item array.
      return of([]);
    }
    return this.http.get<Item[]>(`api/items/?name=${term}`).pipe(
      tap(_ => this.log(`found Items matching "${term}"`)),
      catchError(this.handleError<Item[]>('searchItems', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * @param operation
   * @param result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('ItemService: ' + message);
  }
}
