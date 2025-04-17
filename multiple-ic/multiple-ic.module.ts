import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MultipleICPageRoutingModule } from './multiple-ic-routing.module';

import { MultipleICPage } from './multiple-ic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MultipleICPageRoutingModule
  ],
  declarations: [MultipleICPage]
})
export class MultipleICPageModule {}
