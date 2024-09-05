import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private storageService: StorageService) {}

  setName() {
    this.storageService.set('userName', 'Tom');
  }

  async getName() {
    let userName = await this.storageService.get('userName');
    alert(userName);
  }

  removeName() {
    this.storageService.remove('userName');
  }

  clearAll() {
    this.storageService.clear();
  }

  async getAll() {
    let allData = await this.storageService.getAll();
    console.log(allData);
  }
}
