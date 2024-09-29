import { Component } from '@angular/core';
import { ChartDataset } from 'chart.js';

import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { Observable } from 'rxjs';
import { TicketCountByMonthDTO } from 'src/app/core/models/TicketCountByMonthDTO';
import { DancecategoryandstyleService } from 'src/app/core/services/dancecategoryandstyle.service';
import { TicketService } from 'src/app/core/services/ticket.service';


@Component({
  selector: 'app-statistique-dance-style-per-month',
  templateUrl: './statistique-dance-style-per-month.component.html',
  styleUrls: ['./statistique-dance-style-per-month.component.css']
})
export class StatistiqueDanceStylePerMonthComponent {
  public lineChartOptions: ChartOptions = {
   
  };
  public lineChartData: ChartDataset[] = [];
  selectedYear: number = new Date().getFullYear(); // Default to current year
  currentYear: number = new Date().getFullYear();
  lastYear: number = this.currentYear - 1;

  constructor(
    private ticketService: TicketService,
    
  ) {}

  ngOnInit(): void {
   
    this.loadYearlyTicketCounts(this.currentYear);
  }

  loadYearlyTicketCounts(year: number): void {
   
    this.ticketService.getAllStylesTicketCountsByYear(year).subscribe({
      next: (yearlyData) => {
        this.processYearlyData(yearlyData);
      },
      error: (error) => console.error('Error fetching yearly ticket data:', error)
    });
  }
  onSelectYear(year: number): void {
    this.selectedYear = year;
    this.loadYearlyTicketCounts(year);
  }
  processYearlyData(yearlyData: { [key: number]: { [styleName: string]: TicketCountByMonthDTO[] } }): void {
    this.lineChartData = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    const stylesData = yearlyData[this.selectedYear]; 
  
    if (stylesData) {
      Object.entries(stylesData).forEach(([styleName, monthlyData]) => {
        // Initialize an array with 0 for each month
        let dataPoints = Array(12).fill(0);
        
        // Map the ticket count to the appropriate month
        monthlyData.forEach((dataPoint: TicketCountByMonthDTO) => {
          // Convert the string to a number using parseInt
          const monthIndex = parseInt(dataPoint.month, 10) - 1;
          dataPoints[monthIndex] = dataPoint.ticketCount;
        });
        
        
  
        const newDataset: ChartDataset<'line'> = {
          label: styleName,
          data: dataPoints,
          //... other properties of the dataset
        };
        this.lineChartData.push(newDataset);
      });
    }
  
    // Set the chart options
    this.lineChartOptions = {
      // ... your other options
      scales: {
        x: {
          type: 'category',
          labels: months, // Set the labels to the months array
          grid: {
            color: 'rgba(151, 125, 173, 0.2)', // Soft lilac for grid lines
          },
          ticks: {
            color: '#4A2040', // Violet toned text for ticks
          }
        },
        y: {
          beginAtZero: true, // Ensure the y-axis starts at 0
          grid: {
            color: 'rgba(151, 125, 173, 0.2)',
          },
          ticks: {
            color: '#4A2040',
          }
        }
      }
    };
    
    // You may need to trigger a chart update if it's not automatically updating
  }
  
}
