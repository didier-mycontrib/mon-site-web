import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresConseilsComponent } from './pres-conseils.component';

describe('PresConseilsComponent', () => {
  let component: PresConseilsComponent;
  let fixture: ComponentFixture<PresConseilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresConseilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresConseilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
