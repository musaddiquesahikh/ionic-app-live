import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRolePageRoutingModule } from './edit-role-routing.module';
import { EditRolePage } from './edit-role.page';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditRolePageRoutingModule,
    TranslateModule
  ],
  declarations: [EditRolePage]
})
export class EditRolePageModule {}
