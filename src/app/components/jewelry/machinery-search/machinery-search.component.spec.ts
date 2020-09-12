import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinerySearchComponent } from './machinery-search.component';

describe('MachinerySearchComponent', () => {
  let component: MachinerySearchComponent;
  let fixture: ComponentFixture<MachinerySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachinerySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinerySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
