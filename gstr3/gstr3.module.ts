import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GSTR3PageRoutingModule } from './gstr3-routing.module';
import { GSTR3Page } from './gstr3.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GSTR3PageRoutingModule,
    TranslateModule
  ],
  declarations: [GSTR3Page]
})
export class GSTR3PageModule {}
