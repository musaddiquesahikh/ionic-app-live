import { TranslatePipe, TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProformaRegisterPageRoutingModule } from './proforma-register-routing.module';

import { ProformaRegisterPage } from './proforma-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProformaRegisterPageRoutingModule,TranslateModule
    
  ],
  declarations: [ProformaRegisterPage]
})
export class ProformaRegisterPageModule {}
