import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotsentPage } from './notsent.page';

const routes: Routes = [
  {
    path: '',
    component: NotsentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotsentPageRoutingModule {}
