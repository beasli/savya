import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterNavBarComponent } from './filter-nav-bar.component';

describe('FilterNavBarComponent', () => {
  let component: FilterNavBarComponent;
  let fixture: ComponentFixture<FilterNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
