import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilitesComponent } from './disponibilites.component';

describe('DisponibilitesComponent', () => {
  let component: DisponibilitesComponent;
  let fixture: ComponentFixture<DisponibilitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisponibilitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponibilitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
