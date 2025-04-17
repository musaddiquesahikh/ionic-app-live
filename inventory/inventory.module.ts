import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryPageRoutingModule } from './inventory-routing.module';

import { InventoryPage } from './inventory.page';
import { TranslateModule } from '@ngx-translate/core';
import { ItemDetailsPage } from '../item-details/item-details.page';
import { EditItemPage } from '../edit-item/edit-item.page';
import { AdjustStockPage } from '../adjust-stock/adjust-stock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryPageRoutingModule,
    TranslateModule
  ],
  declarations: [InventoryPage,ItemDetailsPage,EditItemPage,AdjustStockPage]
})
export class InventoryPageModule {}
