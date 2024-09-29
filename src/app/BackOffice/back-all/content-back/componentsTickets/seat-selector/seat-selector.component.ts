import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Place } from 'src/app/core/models/Place.model';
import { Row } from 'src/app/core/models/row.model';
import { PlaceService } from 'src/app/core/services/place.service';


@Component({
  selector: 'app-seat-selector',
  templateUrl: './seat-selector.component.html',
  styleUrls: ['./seat-selector.component.css']
})
export class SeatSelectorComponent {
  seats?: Place[]; // Ce tableau devrait être rempli avec les données réelles, probablement récupérées depuis le backend
  planId?: number;


  // constructor(
  //   private route: ActivatedRoute, // Injectez ActivatedRoute ici
  //   private placeService: PlaceService
  // ) {}
  // ngOnInit(): void {
  //   this.planId = +this.route.snapshot.params['id']; // Récupère l'ID du plan depuis l'URL
  //   this.placeService.getPlacesByTheatrePlanId().subscribe((places: Place[]) => {
  //     this.seats = places; // Assurez-vous que cette ligne est exécutée et que les données sont chargées
  //   });
  // }

  // selectSeat(seat: Place): void {
  //   // Vérifiez si le siège n'est pas occupé avant de le sélectionner
  //   if (!seat.isOccupied) {
  //     seat.isSelected = !seat.isSelected;
  //   }
  // }

  // getRowLabel(rowEnumValue?: Row): string {
  //   if (rowEnumValue !== undefined) {
  //     return Row[rowEnumValue];
  //   } else {
  //     return ''; // Ou retournez une valeur par défaut ou gérez l'erreur comme vous le souhaitez
  //   }
  // }
  
}