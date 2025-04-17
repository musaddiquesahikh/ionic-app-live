import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InfinityPageRoutingModule } from './infinity-routing.module';
import { InfinityPage } from './infinity.page';
import { MaterialModule } from '../material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfinityPageRoutingModule,
    MaterialModule,
    TranslateModule
  ],
  declarations: [InfinityPage]
})
export class InfinityPageModule {}
