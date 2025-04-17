import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThermalprintPageRoutingModule } from './thermalprint-routing.module';

import { ThermalprintPage } from './thermalprint.page';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThermalprintPageRoutingModule
  ],
  declarations: [ThermalprintPage]
})
export class ThermalprintPageModule {}
