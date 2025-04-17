import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {FormsModule  } from "@angular/forms";
import { AddNewBusinessPage } from './add-new-business.page';

describe('AddNewBusinessPage', () => {
  let component: AddNewBusinessPage;
  let fixture: ComponentFixture<AddNewBusinessPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewBusinessPage ],
      imports: [IonicModule.forRoot(),FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewBusinessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
