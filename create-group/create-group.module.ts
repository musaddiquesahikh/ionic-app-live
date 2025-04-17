import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateGroupPageRoutingModule } from './create-group-routing.module';
import { CreateGroupPage } from './create-group.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateGroupPageRoutingModule,
    TranslateModule,ReactiveFormsModule
  ],
  declarations: [CreateGroupPage]
})
export class CreateGroupPageModule {}
