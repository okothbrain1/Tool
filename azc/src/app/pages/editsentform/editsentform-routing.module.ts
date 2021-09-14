import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditsentformPage } from './editsentform.page';

const routes: Routes = [
  {
    path: '',
    component: EditsentformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditsentformPageRoutingModule {}
