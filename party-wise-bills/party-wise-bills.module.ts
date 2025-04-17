import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartyWiseBillsPageRoutingModule } from './party-wise-bills-routing.module';

import { PartyWiseBillsPage } from './party-wise-bills.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartyWiseBillsPageRoutingModule
  ],
  declarations: [PartyWiseBillsPage]
})
export class PartyWiseBillsPageModule {}
