import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferTechnosComponent } from './prefer-technos.component';

describe('PreferTechnosComponent', () => {
  let component: PreferTechnosComponent;
  let fixture: ComponentFixture<PreferTechnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferTechnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferTechnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
