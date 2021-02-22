import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SentPageRoutingModule } from './sent-routing.module';

import { SentPage } from './sent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SentPageRoutingModule
  ],
  declarations: [SentPage]
})
export class SentPageModule {}
