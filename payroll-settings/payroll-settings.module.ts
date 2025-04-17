import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayrollSettingsPageRoutingModule } from './payroll-settings-routing.module';

import { PayrollSettingsPage } from './payroll-settings.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayrollSettingsPageRoutingModule,TranslateModule
  ],
  declarations: [PayrollSettingsPage]
})
export class PayrollSettingsPageModule {}
