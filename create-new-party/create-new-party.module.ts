import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateNewPartyPageRoutingModule } from './create-new-party-routing.module';
import { CreateNewPartyPage } from './create-new-party.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateNewPartyPageRoutingModule,
    TranslateModule,ReactiveFormsModule
  ],
  declarations: [CreateNewPartyPage]
})
export class CreateNewPartyPageModule {}
