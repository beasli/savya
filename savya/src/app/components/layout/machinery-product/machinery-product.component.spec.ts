import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineryProductComponent } from './machinery-product.component';

describe('MachineryProductComponent', () => {
  let component: MachineryProductComponent;
  let fixture: ComponentFixture<MachineryProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineryProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
