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
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  //@param key
  //Remove item from storage based on key (name)
  public get(key: string): Promise<any> | undefined {
    return this._storage?.get(key);
  }

  //param key
  //Remove item from storage based on key (name)
  public remove(key: string) {
    this._storage?.remove(key);
  }

  // clear all from storage
  public clear() {
    this._storage?.clear();
  }

  public getAll() {
    this._storage?.keys();
  }
}
