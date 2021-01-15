import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afa: AngularFireAuth
  ) { }

  login(user) {

  }

  register(email, password) {
    return this.afa.createUserWithEmailAndPassword(email, password);
  }

  logout() {

  }

  getAuth() {

  }

}
