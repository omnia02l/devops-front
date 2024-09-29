import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketKpiCopetitionStatComponent } from './ticket-kpi-copetition-stat.component';

describe('TicketKpiCopetitionStatComponent', () => {
  let component: TicketKpiCopetitionStatComponent;
  let fixture: ComponentFixture<TicketKpiCopetitionStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketKpiCopetitionStatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketKpiCopetitionStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
