import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CategoryWiseReportPageRoutingModule } from './category-wise-report-routing.module';
import { CategoryWiseReportPage } from './category-wise-report.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryWiseReportPageRoutingModule,
    TranslateModule
  ],
  declarations: [CategoryWiseReportPage]
})
export class CategoryWiseReportPageModule {}
