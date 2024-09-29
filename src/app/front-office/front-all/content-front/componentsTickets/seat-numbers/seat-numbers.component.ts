// seat-numbers.component.ts

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Competition } from 'src/app/core/models/Competition';
import { Place } from 'src/app/core/models/Place.model';

import { SeatNumbersByRow } from 'src/app/core/models/seat-numbers-by-row';
import { TicketCard } from 'src/app/core/models/ticket-card.model';
import { AccountService } from 'src/app/core/services/account.service';
import { CompetitionService } from 'src/app/core/services/competition.service';
import { PlaceService } from 'src/app/core/services/place.service';
import { TicketCardService } from 'src/app/core/services/ticket-card.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-seat-numbers',
  templateUrl: './seat-numbers.component.html',
  styleUrls: ['./seat-numbers.component.css']
})
export class SeatNumbersComponent implements OnInit {
  seatNumbersByRow: { [key: string]: Place[] } = {};
  selectedSeats: Place[] = [];
  private refreshIntervalId: any;
  selectedPlaceIds: number[] = [];
  ticketCard: TicketCard | null = null;
  userId: number | null = null;
  competition!: Competition;
  venuePlanId = Number(this.route1.snapshot.paramMap.get('venuePlanId'));
  competitionId = Number(this.route1.snapshot.paramMap.get('competitionId'));
  constructor(private placeService: PlaceService,
    private ticketCardService: TicketCardService,
    private accountService: AccountService,
    private cdr: ChangeDetectorRef,
    private route: Router,
    private route1: ActivatedRoute,
    private competitionService: CompetitionService,
    private location: Location) {}



    ngOnInit(): void {
      console.log("hetha",this.competitionId)
      this.loadCompetitionDetails(this.competitionId);
      this.route1.paramMap.subscribe(params => {
        const id = params.get('venuePlanId');
        if (id) {
          this.venuePlanId = Number(id);
          this.refreshSeatNumbers(this.venuePlanId);
      console.log(this.venuePlanId);
      this.restoreSelectedSeats();
      this.refreshSeatNumbers(this.venuePlanId); // Start refreshing seat numbers for planId 1
      this.setupRefreshInterval(this.venuePlanId);
      this.getPrincipal();} else {
      console.log(this.venuePlanId);
      }
    });
    }
    goBack(): void {
      this.location.back();  // Correct usage of the Location service's back method
    }
    getPrincipal() {
      this.accountService.getPrincipal().subscribe({
        next: (data) => {
          this.userId = data.id;
          console.log(this.userId);
        },
        error: (err) => {
          console.error('Error fetching user details:', err);
        }
      });
    }

    ngOnDestroy(): void {
      this.clearRefreshInterval(); // Stops the refreshing when the component is destroyed
    }

    private restoreSelectedSeats(): void {
      const savedSelection = sessionStorage.getItem('selectedSeats');
      if (savedSelection) {
        this.selectSeatsFromSession(savedSelection);
      }
    }

    private selectSeatsFromSession(savedSelection: string): void {
      const seats = JSON.parse(savedSelection) as Place[];
      seats.forEach(seat => {
        if (seat.row) {
          const seatRow = this.seatNumbersByRow[seat.row];
          const seatInRow = seatRow?.find(s => s.seatNumber === seat.seatNumber);
          if (seatInRow) {
            seatInRow.isSelected = true;
          }
        }
      });
    }

    private setupRefreshInterval(planId: number): void {
      this.refreshIntervalId = setInterval(() => this.refreshSeatNumbers(planId), 6000);
    }

    private clearRefreshInterval(): void {
      if (this.refreshIntervalId) {
        clearInterval(this.refreshIntervalId);
      }
    }

    private refreshSeatNumbers(planId: number): void {
      this.placeService.getSeatNumbersByRow(planId).subscribe((data: any) => {
        this.transformSeatData(data);
      });
    }

    private transformSeatData(data: { [row: string]: Array<{ seatNumber: string, isSelected: boolean, isOccupied: boolean, idPlace?: number }> }): void {
      const transformedData: SeatNumbersByRow = {};

  // Assume data structure to be the same as provided by the backend:
  // { [row: string]: Array<{ seatNumber: string, isSelected: boolean, isOccupied: boolean }> }
  Object.entries(data).forEach(([row, seatInfos]: [string, Array<{ seatNumber: string, isSelected: boolean, isOccupied: boolean }>]) => {
    transformedData[row] = seatInfos.map(seatInfo => ({

      seatNumber: seatInfo.seatNumber,
      row: row, // Assuming the row is a string that can be used directly
      isOccupied: seatInfo.isOccupied,
      isSelected: seatInfo.isSelected
    }));
  });

  this.seatNumbersByRow = transformedData;
  this.cdr.detectChanges(); // If needed to trigger change detection
}

  toggleSeatSelection(row: string, seatNumber: string): void {
    let localPlace = this.seatNumbersByRow[row]?.find(p => p.seatNumber === seatNumber);

    if (!localPlace || localPlace.isOccupied) {
      console.error(`Place not found for seatNumber ${seatNumber} and row ${row}, or it is already occupied.`);
      return;
    }

    const isSelected = !localPlace.isSelected;
    localPlace.isSelected = isSelected;

    if (isSelected) {
      // Ajouter la place sélectionnée au tableau s'il est sélectionné
      localPlace.temporaryId = localPlace.idPlace; // Stocker l'ID dans la propriété temporaire
      this.selectedSeats.push(localPlace);
    } else {
      // Retirer la place du tableau s'il est désélectionné
      this.selectedSeats = this.selectedSeats.filter(place => place !== localPlace);
    }

    // Si localPlace a un id, mettre à jour directement, sinon récupérer depuis le backend
    if (localPlace.idPlace) {
      this.updatePlace(localPlace);
    } else {
      this.placeService.getPlaceBySeatAndRow(seatNumber, row,this.venuePlanId).subscribe({
        next: (placeFromBackend) => {
          if (!placeFromBackend.idPlace) {
            console.error(`Place not found for seatNumber ${seatNumber} and row ${row}`);
            return;
          }
          placeFromBackend.isSelected = isSelected;
          this.updatePlace(placeFromBackend);
        },
        error: (error) => console.error('Error fetching place:', error)
      });
    }

    // Enregistrement des ID des places sélectionnées dans une liste
    const selectedPlaceIds = this.selectedSeats.map(place => place.idPlace);
    console.log('Selected place IDs:', selectedPlaceIds);

    this.cdr.detectChanges();
    console.log(this.selectedSeats); // Add this line to debug
    sessionStorage.setItem('selectedSeats', JSON.stringify(this.selectedSeats));
  }


  updatePlace(place: Place): void {
    this.placeService.togglePlaceSelection(place).subscribe({
      next: (updatedPlace) => {
        console.log('Place updated:', updatedPlace);
        // Récupérer l'ID de la place mise à jour
        const updatedPlaceId = updatedPlace.idPlace;
        if (updatedPlaceId !== undefined) {
          console.log('Updated place ID:', updatedPlaceId);

          // Ajouter l'ID de la place mise à jour à la liste partagée
          this.selectedPlaceIds.push(updatedPlaceId);
        }
        this.cdr.detectChanges();  // Force la détection de changement
      },
      error: (error) => console.error('Error updating place:', error)
    });
  }

  confirmSelectedPlaces(): void {
    if (this.userId) {
    this.placeService.confirmPlaces(this.venuePlanId,this.userId,this.selectedPlaceIds)
      .pipe(
        switchMap((response) => {
          // Logique exécutée après la confirmation des places
          console.log('Les places ont été confirmées avec succès.', response);
          // Supposons que userId est déterminé de manière dynamique

          // Retourne l'Observable de la création du panier
          return this.ticketCardService.createTicketCardForUser(this.userId!);
        })
      )
      .subscribe({
        next: (ticketCard) => {
          // Logique exécutée après la création du panier
          console.log(`Ticket Card for user ID: ${ticketCard.userid} created successfully`);
          // Navigation vers la page du panier
          this.route.navigate(['/home/ticket-card', ticketCard.userid,this.competitionId]);
          // Réinitialisation de la liste des ID des places sélectionnées
          this.selectedPlaceIds = [];
        },
        error: (error) => {
          // Gestion des erreurs pour toute la chaîne de l'Observable
          console.error('Une erreur est survenue lors de la confirmation des places ou de la création du panier.', error);
        }
      });
    } else {
      console.error('No userId available');
    }
  }
  createTicketCardForUser(userId  :number):void{
  if (userId) {
    this.ticketCardService.createTicketCardForUser(userId).subscribe({
      next: (ticketCard) => {
        this.ticketCard = ticketCard;
        console.log(this.ticketCard);

      },
      error: (error) => {
        console.error('Error fetching TicketCard', error);
      }
    });
  } else {
    console.error('No userId provided');
  }
}

shouldDisableConfirmButton(): boolean {
  return this.selectedSeats.length === 0 || this.selectedSeats.some(seat => seat.idPlace === undefined || !seat.isSelected);
}

loadCompetitionDetails(competitionId: number) {
  this.competitionService.getCompetitionById(competitionId).subscribe(
    competition => {
      this.competition = competition;
    },
    error => {
      console.log('Error fetching competition details:', error);
    }
  );
}

}
