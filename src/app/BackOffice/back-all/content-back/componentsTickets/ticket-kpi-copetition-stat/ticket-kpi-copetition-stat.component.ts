import { Component } from '@angular/core';
import { TicketKpiDTO } from 'src/app/core/models/TicketKpiDTO';
import { CompetitionService } from 'src/app/core/services/competition.service';
import { TicketPerCompetitionStatisticsComponent } from '../ticket-per-competition-statistics/ticket-per-competition-statistics.component';
import { MatDialog } from '@angular/material/dialog';
import { Data } from '@uploadcare/blocks';
import { OccupancyDialogComponent } from '../occupancy-dialog/occupancy-dialog.component';
import { SeatStatisticsComponent } from '../seat-statistics/seat-statistics.component';

@Component({
  selector: 'app-ticket-kpi-copetition-stat',
  templateUrl: './ticket-kpi-copetition-stat.component.html',
  styleUrls: ['./ticket-kpi-copetition-stat.component.css']
})
export class TicketKpiCopetitionStatComponent {
  displayedColumns: string[] = ['competitionName', 'venueName', 'totalTicketsSold', 'totalRevenue', 'occupancyRate', 'analyze'];
  resultType: string = '';
  dataSource!: TicketKpiDTO[];
  analysisMessage: string = 'Click "Analyze" to diagnose your sales.';  
  constructor(private competitionService: CompetitionService,public dialog: MatDialog) {}

  ngOnInit() {
    this.competitionService.getAllCompetitionStats().subscribe(data => {
      this.dataSource = data;
      
    });
  }
  openDialog(competitionId: number): void {
    this.dialog.open(TicketPerCompetitionStatisticsComponent, {
      width: '600px',
      data: { competitionId: competitionId }
    });
  }
  openOccupancyDialog(occupiedSeats: number, totalSeats: number): void {
    this.dialog.open(OccupancyDialogComponent, {
      width: '300px',
      data: { occupiedSeats, totalSeats }
    });
  
}
openSeatStatisticsDialog(venuePlanId: number): void {
  this.dialog.open(SeatStatisticsComponent, {
    width: '80%',
    data: { venuePlanId: venuePlanId }
  });
}
analyzeData(item: TicketKpiDTO): void {
  if (item.occupancyRate < 30) {
    this.analysisMessage = `Sales are very low for ${item.competitionName}, consider marketing boosts or discounts.`;
    this.resultType = 'low';
  } else if (item.occupancyRate >= 30 && item.occupancyRate < 50) {
    this.analysisMessage = `Moderate sales for ${item.competitionName}, monitor closely.`;
    this.resultType = 'moderate';
  } else if (item.occupancyRate >= 50) {
    this.analysisMessage = `Good sales performance for ${item.competitionName}.`;
    this.resultType = 'good';
  } else {
    this.analysisMessage = `Check data for anomalies; unusual occupancy rate for ${item.competitionName}.`;
    this.resultType = 'check';
  }
}
}
