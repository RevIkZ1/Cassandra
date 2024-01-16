import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimoviComponent } from './timovi.component';

describe('TimoviComponent', () => {
  let component: TimoviComponent;
  let fixture: ComponentFixture<TimoviComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimoviComponent]
    });
    fixture = TestBed.createComponent(TimoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
