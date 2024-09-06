import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  //_ al principio se usa para referirse a una propiedad privada
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  // init the angular storage
  async init() {
    this._storage = await this.storage.create();
  }

  //@param key
  //@returns storaged value {string}
  public set(key: any, value: any) {
    this._storage?.set(key, value);
  }

  //@param key
  //Remove item from storage based on key (name)
  public get(key: any): Promise<any> | undefined {
    return this._storage?.get(key);
  }

  //param key
  //Remove item from storage based on key (name)
  public remove(key: any) {
    this._storage?.remove(key);
  }

  // clear all from storage
  public clear() {
    this._storage?.clear();
  }

  public async getAll(): Promise<any[]> {
    const items: any[] = [];

    if (this._storage) {
      const keys = await this._storage?.keys();

      for (let key of keys) {
        const value = await this._storage.get(key);
        items.push({ key, value });
      }
    }
    return items;
  }
}
