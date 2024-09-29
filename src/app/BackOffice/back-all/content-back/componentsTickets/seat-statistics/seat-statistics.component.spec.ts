import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatStatisticsComponent } from './seat-statistics.component';

describe('SeatStatisticsComponent', () => {
  let component: SeatStatisticsComponent;
  let fixture: ComponentFixture<SeatStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
