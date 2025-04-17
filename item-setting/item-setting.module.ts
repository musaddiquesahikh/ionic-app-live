import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ItemSettingPageRoutingModule } from './item-setting-routing.module';
import { ItemSettingPage } from './item-setting.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemSettingPageRoutingModule,
    TranslateModule,ReactiveFormsModule
  ],
  declarations: [ItemSettingPage]
})
export class ItemSettingPageModule {}
