import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PartyWiseItemSalesPageRoutingModule } from './party-wise-item-sales-routing.module';
import { PartyWiseItemSalesPage } from './party-wise-item-sales.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartyWiseItemSalesPageRoutingModule,
    TranslateModule
  ],
  declarations: [PartyWiseItemSalesPage]
})
export class PartyWiseItemSalesPageModule {}
