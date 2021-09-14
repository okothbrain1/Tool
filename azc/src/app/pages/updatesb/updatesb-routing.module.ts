import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatesbPage } from './updatesb.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatesbPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatesbPageRoutingModule {}
