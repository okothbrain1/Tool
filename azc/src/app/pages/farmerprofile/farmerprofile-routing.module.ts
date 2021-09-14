import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmerprofilePage } from './farmerprofile.page';

const routes: Routes = [
  {
    path: '',
    component: FarmerprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmerprofilePageRoutingModule {}
