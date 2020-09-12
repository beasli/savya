import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineryProductsComponent } from './machinery-products.component';

describe('MachineryProductsComponent', () => {
  let component: MachineryProductsComponent;
  let fixture: ComponentFixture<MachineryProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineryProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineryProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
