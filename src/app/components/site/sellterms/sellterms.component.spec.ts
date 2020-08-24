import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelltermsComponent } from './sellterms.component';

describe('SelltermsComponent', () => {
  let component: SelltermsComponent;
  let fixture: ComponentFixture<SelltermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelltermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelltermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
