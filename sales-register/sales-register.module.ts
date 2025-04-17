import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SalesRegisterPageRoutingModule } from './sales-register-routing.module';
import { SalesRegisterPage } from './sales-register.page';
import { ViewReportPage } from "../view-report/view-report.page";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesRegisterPageRoutingModule,
    TranslateModule
  ],
  declarations: [SalesRegisterPage]
})
export class SalesRegisterPageModule {}
