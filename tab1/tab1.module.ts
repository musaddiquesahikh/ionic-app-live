import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { GSTR2Page } from "../gstr2/gstr2.page";
import { JournalVouchersPage } from "../journal-vouchers/journal-vouchers.page";
import { EmptyPage } from "../empty/empty.page";
import { AddNewBusinessPage } from "../add-new-business/add-new-business.page";
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { TranslateModule } from '@ngx-translate/core';
import { TimerService } from '../timer.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,ReactiveFormsModule,
    ExploreContainerComponentModule,TranslateModule,
    Tab1PageRoutingModule,
  ],
  providers: [Vibration],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [Tab1Page, 
    GSTR2Page, JournalVouchersPage,EmptyPage]
})
export class Tab1PageModule {}
