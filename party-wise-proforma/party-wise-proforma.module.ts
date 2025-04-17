import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartyWiseProformaPageRoutingModule } from './party-wise-proforma-routing.module';

import { PartyWiseProformaPage } from './party-wise-proforma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartyWiseProformaPageRoutingModule,
    TranslateModule
  ],
  declarations: [PartyWiseProformaPage]
})
export class PartyWiseProformaPageModule {}
