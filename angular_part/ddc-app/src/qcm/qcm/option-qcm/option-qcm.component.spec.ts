import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionQcmComponent } from './option-qcm.component';

describe('OptionQcmComponent', () => {
  let component: OptionQcmComponent;
  let fixture: ComponentFixture<OptionQcmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionQcmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionQcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
