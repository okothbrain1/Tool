import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmerprofilePageRoutingModule } from './farmerprofile-routing.module';

import { FarmerprofilePage } from './farmerprofile.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
//import { AppLauncher } from '@ionic-native/app-launcher/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmerprofilePageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [FarmerprofilePage]
})
export class FarmerprofilePageModule {}
