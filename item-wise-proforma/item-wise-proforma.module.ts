import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemWiseProformaPageRoutingModule } from './item-wise-proforma-routing.module';

import { ItemWiseProformaPage } from './item-wise-proforma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemWiseProformaPageRoutingModule,TranslateModule
  ],
  declarations: [ItemWiseProformaPage]
})
export class ItemWiseProformaPageModule {}
