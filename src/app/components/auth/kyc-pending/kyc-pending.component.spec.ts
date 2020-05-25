import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycPendingComponent } from './kyc-pending.component';

describe('KycPendingComponent', () => {
  let component: KycPendingComponent;
  let fixture: ComponentFixture<KycPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
