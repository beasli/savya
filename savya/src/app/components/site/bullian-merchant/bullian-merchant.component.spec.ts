import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BullianMerchantComponent } from './bullian-merchant.component';

describe('BullianMerchantComponent', () => {
  let component: BullianMerchantComponent;
  let fixture: ComponentFixture<BullianMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BullianMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BullianMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
