import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresDeveloppementComponent } from './pres-developpement.component';

describe('PresDeveloppementComponent', () => {
  let component: PresDeveloppementComponent;
  let fixture: ComponentFixture<PresDeveloppementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresDeveloppementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresDeveloppementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
