import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultQcmComponent } from './result-qcm.component';

describe('ResultQcmComponent', () => {
  let component: ResultQcmComponent;
  let fixture: ComponentFixture<ResultQcmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultQcmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultQcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
