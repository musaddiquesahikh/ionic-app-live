import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShowCompanyListPageRoutingModule } from './show-company-list-routing.module';
import { ShowCompanyListPage } from './show-company-list.page';
import { AddNewBusinessPage } from "../add-new-business/add-new-business.page";
import { TranslateModule } from '@ngx-translate/core';
// import { LanguagePage } from '../language/language.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowCompanyListPageRoutingModule,
    TranslateModule
  ],
  declarations: [ShowCompanyListPage]
})
export class ShowCompanyListPageModule {}
