import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DidierComponent } from './didier.component';

describe('DidierComponent', () => {
  let component: DidierComponent;
  let fixture: ComponentFixture<DidierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DidierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DidierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
