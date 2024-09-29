import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/core/models/Place.model';
import { PlaceService } from 'src/app/core/services/place.service';

@Component({
  selector: 'app-reservation-place',
  templateUrl: './reservation-place.component.html',
  styleUrls: ['./reservation-place.component.css']
})
export class ReservationPlaceComponent implements OnInit {
  seatsByRow: Place[][] = [];

  constructor(private placeService: PlaceService) { }
  rowMap: Map<string, Place[]> = new Map<string, Place[]>();

  ngOnInit(): void {
    this.placeService.getSeatsByRow().subscribe(rows => {
      this.rowMap = rows;
    });
  }
  

  reserveSeat(place: Place): void {
    // Call the backend to reserve the seat
    this.placeService.modifyPlace({...place, isOccupied: true}).subscribe(
      updatedPlace => {
        // Update the local state to reflect the reservation
        place.isOccupied = updatedPlace.isOccupied;
      },
      error => {
        console.error('Error reserving seat:', error);
      }
    );
  }
}