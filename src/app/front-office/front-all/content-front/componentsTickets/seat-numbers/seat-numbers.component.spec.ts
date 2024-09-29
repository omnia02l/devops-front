import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatNumbersComponent } from './seat-numbers.component';

describe('SeatNumbersComponent', () => {
  let component: SeatNumbersComponent;
  let fixture: ComponentFixture<SeatNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatNumbersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
