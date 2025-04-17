import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditCompanyPageRoutingModule } from './edit-company-routing.module';
import { EditCompanyPage } from './edit-company.page';
import { PaymentGatewayPage } from "../payment-gateway/payment-gateway.page";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCompanyPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [EditCompanyPage, PaymentGatewayPage]
})
export class EditCompanyPageModule {}
