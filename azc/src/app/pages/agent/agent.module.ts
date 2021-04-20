import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgentPageRoutingModule } from './agent-routing.module';

import { AgentPage } from './agent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    IonicModule,
    AgentPageRoutingModule
  ],
  declarations: [AgentPage]
})
export class AgentPageModule {}
