import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { PasswordStrengthPage } from "../password-strength/password-strength.page";
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { WalkthroughModule } from 'ngx-walkthrough';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,WalkthroughModule
  ],

  declarations: [LoginPage,PasswordStrengthPage]
})
export class LoginPageModule {}

