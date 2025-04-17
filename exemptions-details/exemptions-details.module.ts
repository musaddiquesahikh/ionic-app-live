import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExemptionsDetailsPageRoutingModule } from './exemptions-details-routing.module';

import { ExemptionsDetailsPage } from './exemptions-details.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExemptionsDetailsPageRoutingModule,TranslateModule
  ],
  declarations: [ExemptionsDetailsPage]
})
export class ExemptionsDetailsPageModule {}
