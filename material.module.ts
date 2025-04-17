import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule}from '@angular/material/stepper';
import { MatButtonModule}from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }from '@angular/material/input';
//  import { MatOptionModule} from '@angular/material
import {  MatSelectModule} from '@angular/material/select';
import { MatIconModule}from '@angular/material/icon';
import {  MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule}from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatTableModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    // MatOptionModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule
  ]
})
export class MaterialModule { }
