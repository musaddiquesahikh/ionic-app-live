import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddNewItemPageRoutingModule } from './add-new-item-routing.module';
import { AddNewItemPage } from './add-new-item.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    AddNewItemPageRoutingModule
  ],
  declarations: [AddNewItemPage]
})
export class AddNewItemPageModule {}
