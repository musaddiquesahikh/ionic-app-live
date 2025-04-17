import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GSTR1PageRoutingModule } from './gstr1-routing.module';
import { GSTR1Page } from './gstr1.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GSTR1PageRoutingModule,
    TranslateModule
  ],
  declarations: [GSTR1Page]
})
export class GSTR1PageModule {}
