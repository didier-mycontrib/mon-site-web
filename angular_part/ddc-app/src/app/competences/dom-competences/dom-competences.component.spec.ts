import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomCompetencesComponent } from './dom-competences.component';

describe('DomCompetencesComponent', () => {
  let component: DomCompetencesComponent;
  let fixture: ComponentFixture<DomCompetencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomCompetencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomCompetencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
