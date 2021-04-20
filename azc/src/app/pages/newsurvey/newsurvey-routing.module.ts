import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsurveyPage } from './newsurvey.page';

const routes: Routes = [
  {
    path: '',
    component: NewsurveyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsurveyPageRoutingModule {}
