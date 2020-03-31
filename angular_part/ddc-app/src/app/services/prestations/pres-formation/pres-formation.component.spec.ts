import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresFormationComponent } from './pres-formation.component';

describe('PresFormationComponent', () => {
  let component: PresFormationComponent;
  let fixture: ComponentFixture<PresFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
