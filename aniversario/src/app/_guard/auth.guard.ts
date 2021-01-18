import { FirebaseService } from './../_service/firebase.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.firebaseService.getAuth().subscribe(user => {
        debugger

        if (!user) { 
          this.router.navigate(['login']); 
        }

        resolve(user ? true : false)
      })
    })
  }
  
}
