import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/core/models/Place.model';

import { PlaceService } from 'src/app/core/services/place.service';


@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {
  places: Place[] = [];
  editingIndex: number | null = null;

  constructor(private placeService: PlaceService) {}

  ngOnInit(): void {
    this.loadPlaces();
  }

  loadPlaces(): void {
    this.placeService.getAllPlaces().subscribe((data) => {
      this.places = data;
    });
  }

  addNewPlace(): void {
    const newPlace: Place = {
      idPlace: 0,
      seatNumber: '',
     
      isOccupied: false,
      isSelected:false
      
      // Initialiser d'autres propriétés si nécessaire
    };
    this.places.unshift(newPlace);
    this.editingIndex = 0;
  }

  editPlace(index: number): void {
    this.editingIndex = index;
  }

  cancelEdit(): void {
    this.editingIndex = null;
    if (!this.places[0].idPlace) {
      this.places.shift();
    }
    this.loadPlaces();
  }

  onSubmit(place: Place, index: number): void {
    if (place.idPlace) {
      this.placeService.modifyPlace(place).subscribe(() => {
        this.editingIndex = null;
      });
    } else {
      this.placeService.addPlace(place).subscribe(() => {
        this.editingIndex = null;
        this.loadPlaces();
      });
    }
  }

  deletePlace(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce lieu ?')) {
      this.placeService.deletePlace(id).subscribe({
        next: () => {
          this.places = this.places.filter(place => place.idPlace !== id);
        },
        error: err => {
          console.error('Erreur lors de la suppression du lieu:', err);
        }
      });
    }
  }
}
