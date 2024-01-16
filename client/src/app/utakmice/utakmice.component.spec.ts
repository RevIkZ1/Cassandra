import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtakmiceComponent } from './utakmice.component';

describe('UtakmiceComponent', () => {
  let component: UtakmiceComponent;
  let fixture: ComponentFixture<UtakmiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtakmiceComponent]
    });
    fixture = TestBed.createComponent(UtakmiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
