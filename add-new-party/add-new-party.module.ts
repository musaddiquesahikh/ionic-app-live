import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddNewPartyPageRoutingModule } from './add-new-party-routing.module';
import { AddNewPartyPage } from './add-new-party.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddNewPartyPageRoutingModule,
    TranslateModule,ReactiveFormsModule
  ],
  declarations: [AddNewPartyPage]
})
export class AddNewPartyPageModule { }
