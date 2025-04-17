import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PartyDetailsPageRoutingModule } from './party-details-routing.module';
import { PartyDetailsPage } from './party-details.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartyDetailsPageRoutingModule,
    TranslateModule
  ],
  declarations: [PartyDetailsPage]
})
export class PartyDetailsPageModule {}
