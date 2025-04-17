import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PartyWiseItemPurchasePage } from './party-wise-item-purchase.page';

describe('PartyWiseItemPurchasePage', () => {
  let component: PartyWiseItemPurchasePage;
  let fixture: ComponentFixture<PartyWiseItemPurchasePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyWiseItemPurchasePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PartyWiseItemPurchasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
