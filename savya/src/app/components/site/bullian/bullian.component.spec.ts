import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BullianComponent } from './bullian.component';

describe('BullianComponent', () => {
  let component: BullianComponent;
  let fixture: ComponentFixture<BullianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BullianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BullianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
