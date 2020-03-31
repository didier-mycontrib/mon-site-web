import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQcmComponent } from './admin-qcm.component';

describe('AdminQcmComponent', () => {
  let component: AdminQcmComponent;
  let fixture: ComponentFixture<AdminQcmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQcmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
