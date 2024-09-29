import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlaceService } from 'src/app/core/services/place.service';

@Component({
  selector: 'app-seat-statistics',
  templateUrl: './seat-statistics.component.html',
  styleUrls: ['./seat-statistics.component.css']
})
export class SeatStatisticsComponent implements OnInit {
  seatNumbersByRow: { [key: string]: any[] } = {};
  venuePlanId: number;
  placeStatusById: { [id: number]: string } = {};

  constructor(
    private placeService: PlaceService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private dialogRef: MatDialogRef<SeatStatisticsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { venuePlanId: number }
  ) {
    this.venuePlanId = data.venuePlanId;
  }

  ngOnInit(): void {
    this.refreshSeatNumbers(this.venuePlanId);
    this.loadSeatStatistics(this.venuePlanId);
  }

  private loadSeatStatistics(planId: number): void {
    this.placeService.getSeatStatuses(planId).subscribe({
      next: (stats) => {
        this.processStatistics(stats);
      },
      error: (err) => {
        console.error('Error loading place statistics:', err);
      }
    });
  }

  private processStatistics(stats: any[]): void {
    stats.forEach(stat => {
      this.placeStatusById[stat.idPlace] = stat.status;
    });
    this.applyStatisticsToSeats();
    this.cdr.detectChanges();
  }

  private refreshSeatNumbers(planId: number): void {
    this.placeService.getSeatNumbersByRow(planId).subscribe({
      next: (seatData: any) => {
        this.seatNumbersByRow = this.transformSeatData(seatData);
      },
      error: (error) => {
        console.error('Error fetching seat numbers:', error);
      }
    });
  }

  private transformSeatData(data: { [row: string]: Array<{ seatNumber: string, idPlace?: number }> }): { [key: string]: any[] } {
    const transformedData: { [key: string]: any[] } = {};
    Object.entries(data).forEach(([row, seats]) => {
      transformedData[row] = seats.map(seat => ({ ...seat }));
    });
    return transformedData;
  }

  getSeatStatusClass(seatId: number): string {
    const status = this.placeStatusById[seatId];
    switch (status) {
      case 'never-booked':
        return 'never-booked';
      case 'booked-once':
        return 'booked-once';
      case 'booked-more-than-once':
        return 'booked-more-than-once';
      default:
        return '';
    }
  }

  private applyStatisticsToSeats(): void {
    Object.keys(this.seatNumbersByRow).forEach(row => {
      this.seatNumbersByRow[row].forEach(seat => {
        if (seat.idPlace && this.placeStatusById[seat.idPlace]) {
          seat.status = this.placeStatusById[seat.idPlace];
        }
      });
    });
  }
}
