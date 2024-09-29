import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Dancestyle } from 'src/app/core/models/Dancestyle';
import { DancecategoryandstyleService } from 'src/app/core/services/dancecategoryandstyle.service';


import { TicketService } from 'src/app/core/services/ticket.service';

@Component({
  selector: 'app-statistique-dance-style-per-years',
  templateUrl: './statistique-dance-style-per-years.component.html',
  styleUrls: ['./statistique-dance-style-per-years.component.css']
})
export class StatistiqueDanceStylePerYearsComponent {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartConfiguration['data'] = {
    labels: [], // We will populate this array with years
    datasets: [
      { data: [], label: 'Nombre de Tickets' } // We will populate this array with ticket counts
    ]
  };

  danceStyles: Dancestyle[] = [];
  selectedStyleName: string='';
  startYear: number = new Date().getFullYear(); // par exemple, l'année actuelle
  endYear: number = new Date().getFullYear(); // par exemple, l'année actuelle
  possibleYears: number[] = [];
  distinctStyles: string[] = [];


  constructor(
    private ticketService: TicketService,
    private danceStyleService: DancecategoryandstyleService // Injectez le service DanceStyleService
  ) { }

  ngOnInit(): void {
    this.generatePossibleYears();
    this.loadDistinctStyles();

  }

  loadDistinctStyles(): void {
    this.danceStyleService.getDistinctStyledNames().subscribe({
      next: (data) => {
        this.distinctStyles = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
  onStyleChange(selectedValue: string): void {
    this.selectedStyleName = selectedValue;
    this.loadTickets();
  }

  onChangeYear(type: 'start' | 'end', year: number): void {
    if (type === 'start') {
      this.startYear = year;
    } else {
      this.endYear = year;
    }
    this.loadTickets();
  }


  loadTickets(): void {
    if (this.selectedStyleName) {
      this.ticketService.getTicketCountsByStyleAndYearRange(this.selectedStyleName, this.startYear, this.endYear).subscribe({
        next: (data) => {
        this.barChartData.labels = data.map(item => item[0].toString()); // Assuming first element is year
        this.barChartData.datasets[0].data = data.map(item => item[1]); // Assuming second element is ticket count
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
}
  generatePossibleYears(): void {
    let currentYear = new Date().getFullYear();
    for (let year = currentYear - 10; year <= currentYear; year++) {
      this.possibleYears.push(year);
    }
  }

}