import { IonicModule } from '@ionic/angular';
import { MenuToolbarComponent } from './menu-toolbar.component';

import { NgModule } from '@angular/core';
@NgModule({
  imports: [
    IonicModule
  ],
  declarations: [
    MenuToolbarComponent
  ],
  exports: [
    MenuToolbarComponent,
  ]
})
export class MenuToolbarModule { }
