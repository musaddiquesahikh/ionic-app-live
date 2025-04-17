import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordStrengthPageRoutingModule } from './password-strength-routing.module';

import { PasswordStrengthPage } from './password-strength.page';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordStrengthPageRoutingModule,
    TranslateModule
  ],
  declarations: [PasswordStrengthPage]
})
export class PasswordStrengthPageModule {}
