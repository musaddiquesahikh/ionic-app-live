import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShowItemPageRoutingModule } from './show-item-routing.module';
import { ShowItemPage } from './show-item.page';
import { CreateNewItemPage } from '../create-new-item/create-new-item.page';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowItemPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [ShowItemPage,CreateNewItemPage]
})
export class ShowItemPageModule {}
