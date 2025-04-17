import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateStaffPageRoutingModule } from './create-staff-routing.module';
import { CreateStaffPage } from './create-staff.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateStaffPageRoutingModule,
    TranslateModule
  ],
  declarations: [CreateStaffPage]
})
export class CreateStaffPageModule {}
