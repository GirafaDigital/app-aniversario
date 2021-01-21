
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './_service/storage.service';

import { SliderPage } from './slider/slider.page';
import { LoginPage } from './login/login.page';
import { HomePage } from './home/home.page';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  rootPage: any = LoginPage;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public storageService: StorageService,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.initializeApp();

    var token = this.storageService.obterUid();
    if (token != null) {
      this.router.navigate(['/']);
    } else {
      var slider = storageService.obterSlider();
      if (slider != null) {
        this.router.navigate(['login']);
      } else {
        this.router.navigate(['slider']);
      }
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

     // this.initializeFirebase();
    });
  }

  // private initializeFirebase() {
  //   const options: PushOptions = {
  //     android: {
  //       senderID: '265926752400'
  //     }
  //   }

  //   const pushObject: PushObject = this.push.init(options)

  //   pushObject.on('registration').subscribe(res => console.log(` ${res.registrationId}`))

  //   pushObject.on('notification').subscribe(res => console.log(`Já chegou o disco voador: ${res.message}`))
  // }


}
