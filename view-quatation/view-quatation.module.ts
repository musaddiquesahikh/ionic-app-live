import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewQuatationPageRoutingModule } from './view-quatation-routing.module';
import { ViewQuatationPage } from './view-quatation.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewQuatationPageRoutingModule,
    TranslateModule
  ],
  declarations: [ViewQuatationPage]
})
export class ViewQuatationPageModule {}
