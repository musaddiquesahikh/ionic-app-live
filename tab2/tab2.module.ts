import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { PartyListPage } from '../party-list/party-list.page';
import { EditPartyPage } from "../edit-party/edit-party.page";
import { PartyDetailsPage } from '../party-details/party-details.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    ReactiveFormsModule,FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
     TranslateModule
  ],
  declarations: [Tab2Page, PartyListPage, EditPartyPage, PartyDetailsPage ]
})
export class Tab2PageModule {}
