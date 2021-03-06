import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Item } from './item'


@Injectable()

export class ItemService {

  constructor(private http: Http) {

  }

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private itemsUrl = 'api/items';

  getItems(): Promise<Item[]> {
    return this.http.get(this.itemsUrl)
        .toPromise()
        .then(response => response.json().data as Item[])
        .catch(this.handleError);
  }


  getItem(id: number): Promise<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Item)
        .catch(this.handleError);
  }


  createItem(item: Item): Promise<Item> {
    return this.http
        .post(this.itemsUrl, JSON.stringify(item), { headers: this.headers })
        .toPromise()
        .then(res => res.json().data as Item)
        .catch(this.handleError);
  }

  updateItem(item: Item): Promise<Item> {
    const url = `${this.itemsUrl}/${item.id}`;
    return this.http
        .put(url, JSON.stringify(item), { headers: this.headers })
        .toPromise()
        .then(() => item)
        .catch(this.handleError);
  }

  removeItem(item: Item): Promise<void> {
    const url = `${this.itemsUrl}/${item.id}`;
    return this.http.delete(url, { headers: this.headers })
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}