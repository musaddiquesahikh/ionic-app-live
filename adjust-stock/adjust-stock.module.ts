import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdjustStockPageRoutingModule } from './adjust-stock-routing.module';

import { AdjustStockPage } from './adjust-stock.page';
import { TranslatePipe } from '@ngx-translate/core';
import { InventoryPage } from '../inventory/inventory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdjustStockPageRoutingModule,
    TranslatePipe
  ],
  declarations: [AdjustStockPage,InventoryPage]
})
export class AdjustStockPageModule {}
