import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartyWiseBillPageRoutingModule } from './party-wise-bill-routing.module';

import { PartyWiseBillPage } from './party-wise-bill.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PartyWiseBillPageRoutingModule
  ],
  declarations: [PartyWiseBillPage]
})
export class PartyWiseBillPageModule {}
