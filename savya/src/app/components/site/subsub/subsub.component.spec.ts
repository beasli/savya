import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsubComponent } from './subsub.component';

describe('SubsubComponent', () => {
  let component: SubsubComponent;
  let fixture: ComponentFixture<SubsubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
