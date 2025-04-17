import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { CashPageModule } from '../cash/cash.module';
import { BankPageModule } from '../bank/bank.module';
import { TranslateModule } from '@ngx-translate/core';
//import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
