import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeAttendenceModalPageRoutingModule } from './employee-attendence-modal-routing.module';

import { EmployeeAttendenceModalPage } from './employee-attendence-modal.page';
import { AppComponent } from '../app.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeAttendenceModalPageRoutingModule
  ],
  declarations: [EmployeeAttendenceModalPage],
  // entryComponents: [EmployeeModalComponent],
  bootstrap: [AppComponent],
})
export class EmployeeAttendenceModalPageModule {}
