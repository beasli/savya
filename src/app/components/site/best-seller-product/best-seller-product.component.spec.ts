import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSellerProductComponent } from './best-seller-product.component';

describe('BestSellerProductComponent', () => {
  let component: BestSellerProductComponent;
  let fixture: ComponentFixture<BestSellerProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestSellerProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestSellerProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
