import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public salvarUid(uid: any): StorageService {
    localStorage.setItem('uid', JSON.stringify(uid));
    return this;
  }

  public limparRegistros() {
    localStorage.removeItem('uid');
  }

  public obterUid(): any {
    const uid = localStorage.getItem('uid') as string;
    if (uid != null) {
      return JSON.parse(uid);
    }
    return uid;
  }

}
