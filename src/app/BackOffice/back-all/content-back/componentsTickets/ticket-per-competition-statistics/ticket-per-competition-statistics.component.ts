import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { TicketService } from 'src/app/core/services/ticket.service';

@Component({
  selector: 'app-ticket-per-competition-statistics',
  templateUrl: './ticket-per-competition-statistics.component.html',
  styleUrls: ['./ticket-per-competition-statistics.component.css']
})
export class TicketPerCompetitionStatisticsComponent implements OnInit {
  public chartData: ChartData<'bar' | 'line'> = {
    datasets: [
      {
        data: [],
        label: 'Tickets Sold',
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgb(255, 0, 0)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        type: 'line'
      },
      {
        data: [],
        label: 'Tickets Sold (Bar)',
        backgroundColor: 'rgba(0, 0, 255, 0.3)',
        borderColor: 'blue',
        borderWidth: 1,
        type: 'bar'
      }
    ],
    labels: []
  };

  public chartOptions: ChartConfiguration['options'] = {
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true
      }
    }
  };

  public chartType: ChartType = 'bar';


  constructor(
    private ticketService: TicketService,
    public dialogRef: MatDialogRef<TicketPerCompetitionStatisticsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { competitionId: number }
  ) {}

  ngOnInit(): void {
    this.loadStatistics(this.data.competitionId);
  }

  loadStatistics(competitionId: number): void {
    this.ticketService.getTicketStatistics(competitionId).subscribe({
      next: (data) => {
        this.chartData.datasets[0].data = data.map(stat => stat.ticketCount);
        this.chartData.datasets[1].data = data.map(stat => stat.ticketCount);
        this.chartData.labels = data.map(stat => stat.date);
      },
      error: (error) => {
        console.error('Error loading ticket statistics', error);
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
