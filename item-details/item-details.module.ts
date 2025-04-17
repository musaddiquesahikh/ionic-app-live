import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ItemDetailsPageRoutingModule } from './item-details-routing.module';
import { ItemDetailsPage } from './item-details.page';
import { EditItemPage } from '../edit-item/edit-item.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemDetailsPageRoutingModule,
    TranslateModule
  ],
  declarations: [ItemDetailsPage,EditItemPage]
})
export class ItemDetailsPageModule {}
