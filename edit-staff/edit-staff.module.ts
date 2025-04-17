import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditStaffPageRoutingModule } from './edit-staff-routing.module';
import { EditStaffPage } from './edit-staff.page';
import { ShowStaffListPage } from '../show-staff-list/show-staff-list.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditStaffPageRoutingModule,
    TranslateModule
  ],
  declarations: [EditStaffPage, ShowStaffListPage]
})
export class EditStaffPageModule {}
