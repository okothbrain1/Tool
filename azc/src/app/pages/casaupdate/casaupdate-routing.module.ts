import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasaupdatePage } from './casaupdate.page';

const routes: Routes = [
  {
    path: '',
    component: CasaupdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasaupdatePageRoutingModule {}
