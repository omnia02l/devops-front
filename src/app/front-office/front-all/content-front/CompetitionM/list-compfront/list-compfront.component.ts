import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Competition } from 'src/app/core/models/Competition';
import { CompetitionService } from 'src/app/core/services/competition.service';
import { FileUploadTicketDialogComponent } from '../../componentsTickets/file-upload-ticket-dialog/file-upload-ticket-dialog.component';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-list-compfront',
  templateUrl: './list-compfront.component.html',
  styleUrls: ['./list-compfront.component.css']
})
export class ListCompfrontComponent implements OnInit {
  competitions: Competition[] = [];
  faTicketAlt = faTicketAlt;

  constructor(
    private competitionService: CompetitionService,
    private router: Router,
    private route: ActivatedRoute ,
    public dialog: MatDialog,

  ) {

  }

  ngOnInit(): void {
    this.loadCompetitions();
  }

  loadCompetitions() {
    this.competitionService.getAllCompetitions().subscribe(
      competitions => {
        this.competitions = competitions;
      },
      error => {
        console.log('Error fetching competitions:', error);
      }
    );
  }

  viewCompetitionDetails(competitionId?: number) {
    if (competitionId) {
      this.router.navigate(['/home/details-compfront', competitionId]);
    } else {
      console.error('Competition ID is undefined.');
    }
  }

  registerForCompetition(competitionId: number): void {
    // Redirection vers AddRegistrationComponent avec l'ID de la compétition dans l'URL
    this.router.navigate(['/home/add-registration', competitionId]);
  }


  openDialog(): void {
    this.dialog.open(FileUploadTicketDialogComponent, {
      width: '250px'
    });
  }




  viewVenuePlan(competitionId: number): void {
    console.log("comp",competitionId)
    this.competitionService.getVenuePlanIdByCompetitionId(competitionId).subscribe({
      next: (venuePlanId) => {
        // Optionally, redirect to a venue plan detail page or handle the ID as needed
        console.log('Venue Plan ID:', venuePlanId);
        console.log('competition ID:', competitionId);
        this.router.navigate(['/home/Place', venuePlanId,competitionId]); // Adjust the routing path as needed
      },
      error: (error) => {
        console.error('Error fetching Venue Plan ID:', error);
      }
    });
  }
}
