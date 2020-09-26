import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManmodalComponent } from './manmodal.component';

describe('ManmodalComponent', () => {
  let component: ManmodalComponent;
  let fixture: ComponentFixture<ManmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
