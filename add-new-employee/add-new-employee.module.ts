import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddNewEmployeePageRoutingModule } from './add-new-employee-routing.module';
import { AddNewEmployeePage } from './add-new-employee.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewEmployeePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [AddNewEmployeePage]
})
export class AddNewEmployeePageModule {}
