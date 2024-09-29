import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-occupancy-dialog',
  templateUrl: './occupancy-dialog.component.html',
  styleUrls: ['./occupancy-dialog.component.css']
})
export class OccupancyDialogComponent implements OnInit {
  public doughnutChartData: ChartData<'doughnut'>;
  public doughnutChartType: ChartType = 'doughnut';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { occupiedSeats: number, totalSeats: number }) {
    this.doughnutChartData = {
      labels: ['Occupied Seats', 'Available Seats'],
      datasets: [{
        data: [data.occupiedSeats, data.totalSeats - data.occupiedSeats],
        backgroundColor: ['#4CAF50', '#F5F5F5'],
        hoverBackgroundColor: ['#66BB6A', '#EEEEEE']
      }]
    };
  }

  ngOnInit(): void {
  }
}
