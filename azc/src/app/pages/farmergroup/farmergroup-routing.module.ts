import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmergroupPage } from './farmergroup.page';

const routes: Routes = [
  {
    path: '',
    component: FarmergroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmergroupPageRoutingModule {}
