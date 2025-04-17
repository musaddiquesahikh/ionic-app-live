import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpenseRegisterPageRoutingModule } from './expense-register-routing.module';

import { ExpenseRegisterPage } from './expense-register.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenseRegisterPageRoutingModule,
    TranslateModule
  ],
  declarations: [ExpenseRegisterPage]
})
export class ExpenseRegisterPageModule {}
