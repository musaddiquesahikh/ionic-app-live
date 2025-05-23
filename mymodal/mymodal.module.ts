import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MymodalPageRoutingModule } from './mymodal-routing.module';

import { MymodalPage } from './mymodal.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MymodalPageRoutingModule,TranslateModule
  ],
  declarations: [MymodalPage]
})
export class MymodalPageModule {}
