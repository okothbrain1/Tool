import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { BeneficiaryPageRoutingModule } from './beneficiary-routing.module';

import { BeneficiaryPage } from './beneficiary.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    BeneficiaryPageRoutingModule
  ],
  declarations: [BeneficiaryPage]
})


export class BeneficiaryPageModule {
}

