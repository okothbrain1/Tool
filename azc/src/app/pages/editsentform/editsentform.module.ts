import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditsentformPageRoutingModule } from './editsentform-routing.module';

import { EditsentformPage } from './editsentform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditsentformPageRoutingModule
  ],
  declarations: [EditsentformPage]
})
export class EditsentformPageModule {}
