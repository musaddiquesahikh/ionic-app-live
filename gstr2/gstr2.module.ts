import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GSTR2PageRoutingModule } from './gstr2-routing.module';
import { GSTR2Page } from './gstr2.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GSTR2PageRoutingModule,
    TranslateModule
  ],
  declarations: [GSTR2Page]
})
export class GSTR2PageModule {}
