import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewChallanPageRoutingModule } from './view-challan-routing.module';
import { ViewChallanPage } from './view-challan.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewChallanPageRoutingModule,
    TranslateModule
  ],
  declarations: [ViewChallanPage]
})
export class ViewChallanPageModule {}
