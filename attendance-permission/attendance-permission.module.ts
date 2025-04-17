import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendancePermissionPageRoutingModule } from './attendance-permission-routing.module';

import { AttendancePermissionPage } from './attendance-permission.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendancePermissionPageRoutingModule
  ],
  declarations: [AttendancePermissionPage]
})
export class AttendancePermissionPageModule {}
