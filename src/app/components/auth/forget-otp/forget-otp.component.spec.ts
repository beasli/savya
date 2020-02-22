import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetOtpComponent } from './forget-otp.component';

describe('ForgetOtpComponent', () => {
  let component: ForgetOtpComponent;
  let fixture: ComponentFixture<ForgetOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetOtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
