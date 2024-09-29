import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderbackcompComponent } from './calenderbackcomp.component';

describe('CalenderbackcompComponent', () => {
  let component: CalenderbackcompComponent;
  let fixture: ComponentFixture<CalenderbackcompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalenderbackcompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalenderbackcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
