import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExpenseDetailsPageRoutingModule } from './expense-details-routing.module';
import { ExpenseDetailsPage } from './expense-details.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenseDetailsPageRoutingModule,
    TranslateModule
  ],
  declarations: [ExpenseDetailsPage]
})
export class ExpenseDetailsPageModule {}
