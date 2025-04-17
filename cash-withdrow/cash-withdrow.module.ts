import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CashWithdrowPageRoutingModule } from './cash-withdrow-routing.module';
import { CashWithdrowPage } from './cash-withdrow.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashWithdrowPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [CashWithdrowPage]
})
export class CashWithdrowPageModule {}
