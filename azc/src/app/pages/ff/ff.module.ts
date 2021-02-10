import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FfPageRoutingModule } from './ff-routing.module';

import { FfPage } from './ff.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FfPageRoutingModule
  ],
  declarations: [FfPage]
})
export class FfPageModule {}
