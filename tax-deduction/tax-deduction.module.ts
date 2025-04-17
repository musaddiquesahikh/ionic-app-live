import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TaxDeductionPageRoutingModule } from './tax-deduction-routing.module';
import { TaxDeductionPage } from './tax-deduction.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaxDeductionPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [TaxDeductionPage]
})
export class TaxDeductionPageModule {}
