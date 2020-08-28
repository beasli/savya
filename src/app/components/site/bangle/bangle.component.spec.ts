import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BangleComponent } from './bangle.component';

describe('BangleComponent', () => {
  let component: BangleComponent;
  let fixture: ComponentFixture<BangleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BangleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BangleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
