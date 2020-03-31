import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformQcmComponent } from './perform-qcm.component';

describe('PerformQcmComponent', () => {
  let component: PerformQcmComponent;
  let fixture: ComponentFixture<PerformQcmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformQcmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformQcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
