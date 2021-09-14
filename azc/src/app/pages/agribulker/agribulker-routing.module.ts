import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgribulkerPage } from './agribulker.page';

const routes: Routes = [
  {
    path: '',
    component: AgribulkerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgribulkerPageRoutingModule {}
