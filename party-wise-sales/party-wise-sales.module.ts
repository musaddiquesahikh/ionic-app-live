import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PartyWiseSalesPageRoutingModule } from './party-wise-sales-routing.module';
import { PartyWiseSalesPage } from './party-wise-sales.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartyWiseSalesPageRoutingModule,
    TranslateModule
  ],
  declarations: [PartyWiseSalesPage]
})
export class PartyWiseSalesPageModule {}
