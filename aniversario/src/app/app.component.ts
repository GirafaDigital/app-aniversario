import { SliderPage } from './slider/slider.page';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginPage } from './login/login.page';
import { StorageService } from './_service/storage.service';
import { HomePage } from './home/home.page';

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
    private statusBar: StatusBar
  ) {
    this.initializeApp();

    // var token = this.storageService.obterUid();

    // if (token != null)
    //   this.rootPage = HomePage;
    // else {
    //   var slider = storageService.obterSlider();
    //   if (slider != null)
    //     this.rootPage = LoginPage;
    //   else
    //     this.rootPage = SliderPage;
    // }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


}
