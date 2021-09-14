import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatesbPageRoutingModule } from './updatesb-routing.module';

import { UpdatesbPage } from './updatesb.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatesbPageRoutingModule
  ],
  declarations: [UpdatesbPage]
})
export class UpdatesbPageModule {}
