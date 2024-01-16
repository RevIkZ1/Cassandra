import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadionComponent } from './stadion.component';

describe('StadionComponent', () => {
  let component: StadionComponent;
  let fixture: ComponentFixture<StadionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StadionComponent]
    });
    fixture = TestBed.createComponent(StadionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
