import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgribulkerPageRoutingModule } from './agribulker-routing.module';

import { AgribulkerPage } from './agribulker.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule } from '@angular/forms';

import { MultiFileUploadComponent } from '../../components/multi-file-upload/multi-file-upload.component';
import { FileUploadModule } from 'ng2-file-upload';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgribulkerPageRoutingModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    FileUploadModule,
    RouterModule.forChild([
      {
        path: '',
        component: AgribulkerPage
      }
    ])
  ],
  declarations: [AgribulkerPage, MultiFileUploadComponent]
})
export class AgribulkerPageModule {}
