import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { CreateNewItemPage } from "../create-new-item/create-new-item.page";

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { EditItemPage } from '../edit-item/edit-item.page';
import { ItemDetailsPage } from '../item-details/item-details.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,TranslateModule
  ],
  declarations: [Tab3Page,CreateNewItemPage, EditItemPage, ItemDetailsPage]
})
export class Tab3PageModule {}
