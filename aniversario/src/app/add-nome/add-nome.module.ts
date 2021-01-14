import { MenuToolbarComponent } from './../menu-toolbar/menu-toolbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNomePageRoutingModule } from './add-nome-routing.module';

import { AddNomePage } from './add-nome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNomePageRoutingModule
  ],
  declarations: [
    AddNomePage,
    MenuToolbarComponent
  ]
})
export class AddNomePageModule {}
