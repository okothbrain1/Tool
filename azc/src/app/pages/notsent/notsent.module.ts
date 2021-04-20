import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotsentPageRoutingModule } from './notsent-routing.module';

import { NotsentPage } from './notsent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotsentPageRoutingModule
  ],
  declarations: [NotsentPage]
})
export class NotsentPageModule {}
