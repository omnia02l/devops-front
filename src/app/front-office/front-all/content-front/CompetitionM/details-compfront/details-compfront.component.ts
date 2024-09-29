import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Competition } from 'src/app/core/models/Competition';
import { CompetitionService } from 'src/app/core/services/competition.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-details-compfront',
  templateUrl: './details-compfront.component.html',
  styleUrls: ['./details-compfront.component.css']
})
export class DetailsCompfrontComponent implements OnInit {
  competitionId!: number;
  competition!: Competition;
  countdownMessage!: string;
  notificationMessage: string = '';
  constructor(private route: ActivatedRoute, private competitionService: CompetitionService,    private router: Router) { }
  registerForCompetition(): void {
    // Vérifier si la compétition est définie
    if (this.competition) {
      // Vérifier si le statut de la compétition est 'Upcoming'
      if (this.competition.compstatus && this.competition.compstatus.toString() === 'Upccoming') {
        // Afficher le message
        this.router.navigate(['/home/add-registration', this.competition.idcomp]);

      } else {
        // Redirection vers le composant AddRegistration avec l'ID de la compétition dans l'URL
        this.notificationMessage = " registeration is closed ";
      }
    }
  }


  ngOnInit(): void {
    // Récupérer l'ID de la compétition depuis les paramètres de l'URL
    this.route.params.subscribe(params => {
      this.competitionId = +params['id']; // Convertir la chaîne en nombre
      // Charger les détails de la compétition
      this.loadCompetitionDetails(this.competitionId);
      this.getCompetitionCountdown(this.competitionId);

      // Interroger périodiquement l'API pour mettre à jour le compte à rebours
      interval(1000).subscribe(() => {
        this.getCompetitionCountdown(this.competitionId);
      });
    });
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

  getCompetitionCountdown(competitionId: number): void {
    this.competitionService.getCompetitionCountdown(competitionId)
      .subscribe(
        (data: any) => {
          this.countdownMessage = data.countdown; // Assurez-vous de sélectionner le bon champ ici
        },
        (error) => {
          console.error('Error fetching competition countdown:', error);
        }
      );
  }

}
