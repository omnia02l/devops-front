import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPerCompetitionStatisticsComponent } from './ticket-per-competition-statistics.component';

describe('TicketPerCompetitionStatisticsComponent', () => {
  let component: TicketPerCompetitionStatisticsComponent;
  let fixture: ComponentFixture<TicketPerCompetitionStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketPerCompetitionStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketPerCompetitionStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
