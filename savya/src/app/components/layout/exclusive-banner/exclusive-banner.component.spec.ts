import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusiveBannerComponent } from './exclusive-banner.component';

describe('ExclusiveBannerComponent', () => {
  let component: ExclusiveBannerComponent;
  let fixture: ComponentFixture<ExclusiveBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExclusiveBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExclusiveBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
