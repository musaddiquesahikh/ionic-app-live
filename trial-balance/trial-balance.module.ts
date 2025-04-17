import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TrialBalancePageRoutingModule } from './trial-balance-routing.module';
import { TrialBalancePage } from './trial-balance.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrialBalancePageRoutingModule,
    TranslateModule
  ],
  declarations: [TrialBalancePage]
})
export class TrialBalancePageModule {}
