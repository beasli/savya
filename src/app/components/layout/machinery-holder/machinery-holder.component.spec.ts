import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineryHolderComponent } from './machinery-holder.component';

describe('MachineryHolderComponent', () => {
  let component: MachineryHolderComponent;
  let fixture: ComponentFixture<MachineryHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineryHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineryHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
