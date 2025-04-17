import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SalaryRegisterPageRoutingModule } from './salary-register-routing.module';
import { SalaryRegisterPage } from './salary-register.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalaryRegisterPageRoutingModule,
    ReactiveFormsModule,TranslateModule
  ],
  declarations: [SalaryRegisterPage]
})
export class SalaryRegisterPageModule {}
