import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddNewBusinessPageRoutingModule } from './add-new-business-routing.module';
import { AddNewBusinessPage } from './add-new-business.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AddNewBusinessPageRoutingModule,
    TranslateModule
  ],
  declarations: [AddNewBusinessPage]
})
export class AddNewBusinessPageModule {}
