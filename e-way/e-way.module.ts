import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EWayPageRoutingModule } from './e-way-routing.module';

import { EWayPage } from './e-way.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EWayPageRoutingModule,
    TranslateModule
  ],
  declarations: [EWayPage]
})
export class EWayPageModule {}
