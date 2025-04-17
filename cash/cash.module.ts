import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule} from '@angular/core';
import { CashPageRoutingModule } from './cash-routing.module';
import { CashPage } from './cash.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashPageRoutingModule,
    TranslateModule
  ],
  declarations: [CashPage]
})
export class CashPageModule {}
