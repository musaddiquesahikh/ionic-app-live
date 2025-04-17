import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesOrderRegisterPageRoutingModule } from './sales-order-register-routing.module';

import { SalesOrderRegisterPage } from './sales-order-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesOrderRegisterPageRoutingModule
  ],
  declarations: [SalesOrderRegisterPage]
})
export class SalesOrderRegisterPageModule {}
