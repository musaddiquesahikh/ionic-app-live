import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditPartyPageRoutingModule } from './edit-party-routing.module';
import { EditPartyPage } from './edit-party.page';
import { Tab2Page } from '../tab2/tab2.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPartyPageRoutingModule,
    TranslateModule
  ],
  declarations: [EditPartyPage,Tab2Page]
})
export class EditPartyPageModule {}
