import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { BeneficiaryPageRoutingModule } from './beneficiary-routing.module';

import { BeneficiaryPage } from './beneficiary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BeneficiaryPageRoutingModule
  ],
  declarations: [BeneficiaryPage]
})


export class BeneficiaryPageModule {
}

