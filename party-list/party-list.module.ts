import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PartyListPageRoutingModule } from './party-list-routing.module';
import { PartyListPage } from './party-list.page';
// import { CreateNewPartyPage } from '../create-new-party/create-new-party.page';
import { TranslateModule } from '@ngx-translate/core';
import { AddNewPartyPage } from '../add-new-party/add-new-party.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartyListPageRoutingModule,
    TranslateModule
  ],
  declarations: [AddNewPartyPage]
})
export class PartyListPageModule {}
