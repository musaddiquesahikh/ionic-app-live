import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomPageRoutingModule } from './custom-routing.module';

import { CustomPage } from './custom.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CustomPageRoutingModule,
    TranslateModule
  ],
  declarations: [CustomPage]
})
export class CustomPageModule {}
