import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRessourcesComponent } from './admin-ressources.component';

describe('AdminRessourcesComponent', () => {
  let component: AdminRessourcesComponent;
  let fixture: ComponentFixture<AdminRessourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRessourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRessourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
