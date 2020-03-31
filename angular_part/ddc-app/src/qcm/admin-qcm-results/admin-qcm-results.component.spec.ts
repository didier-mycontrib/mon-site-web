import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQcmResultsComponent } from './admin-qcm-results.component';

describe('AdminQcmResultsComponent', () => {
  let component: AdminQcmResultsComponent;
  let fixture: ComponentFixture<AdminQcmResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQcmResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQcmResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
