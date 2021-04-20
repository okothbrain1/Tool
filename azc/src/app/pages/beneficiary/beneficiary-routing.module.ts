import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeneficiaryPage } from './beneficiary.page';

const routes: Routes = [
  {
    path: '',
    component: BeneficiaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeneficiaryPageRoutingModule {}
