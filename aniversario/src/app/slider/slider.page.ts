import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { StorageService } from '../_service/storage.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})
export class SliderPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(
    public navCtrl: NavController,
    public storageService: StorageService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  navLogin() {
    this.storageService.salvarSlider();
    this.router.navigate(['login']);
  }

}
