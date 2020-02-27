import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveratesComponent } from './liverates.component';

describe('LiveratesComponent', () => {
  let component: LiveratesComponent;
  let fixture: ComponentFixture<LiveratesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveratesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
