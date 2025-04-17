import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShowStaffListPageRoutingModule } from './show-staff-list-routing.module';
import { ShowStaffListPage } from './show-staff-list.page';
import { CreateStaffPage } from "../create-staff/create-staff.page";
import { EditStaffPage } from '../edit-staff/edit-staff.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowStaffListPageRoutingModule,
    TranslateModule
  ],
  declarations: [ShowStaffListPage, CreateStaffPage, EditStaffPage]
})
export class ShowStaffListPageModule {}
