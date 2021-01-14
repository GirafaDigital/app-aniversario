import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNomePage } from './add-nome.page';

const routes: Routes = [
  {
    path: '',
    component: AddNomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNomePageRoutingModule {}
