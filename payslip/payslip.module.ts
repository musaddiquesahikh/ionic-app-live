import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayslipPageRoutingModule } from './payslip-routing.module';

import { PayslipPage } from './payslip.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayslipPageRoutingModule,
  ReactiveFormsModule,TranslateModule
  ],
  declarations: [PayslipPage]
})
export class PayslipPageModule {}
