import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgraciComponent } from './igraci.component';

describe('IgraciComponent', () => {
  let component: IgraciComponent;
  let fixture: ComponentFixture<IgraciComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IgraciComponent]
    });
    fixture = TestBed.createComponent(IgraciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
