import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CasaupdatePageRoutingModule } from './casaupdate-routing.module';

import { CasaupdatePage } from './casaupdate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CasaupdatePageRoutingModule
  ],
  declarations: [CasaupdatePage]
})
export class CasaupdatePageModule {}
