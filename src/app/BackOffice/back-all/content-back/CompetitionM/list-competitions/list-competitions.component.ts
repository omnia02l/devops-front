import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Competition } from 'src/app/core/models/Competition';
import { CompetitionService } from 'src/app/core/services/competition.service';

@Component({
  selector: 'app-list-competitions',
  templateUrl: './list-competitions.component.html',
  styleUrls: ['./list-competitions.component.css']
})
export class ListCompetitionsComponent implements OnInit {
  competitions: Competition[] = [];

  constructor(private competitionService: CompetitionService, private router: Router) { }

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
      this.router.navigate(['/admin/comp-details', competitionId]);
    } else {
      console.error('Competition ID is undefined.');
    }
  }

  updateCompetition(competitionId?: number) {
    if (competitionId) {
      this.router.navigate(['/admin/update-comp', competitionId]);
    } else {
      console.error('Competition ID is undefined.');
    }
  }

  deleteCompetition(competitionId?: number) {
    // Vérifiez si competitionId est défini avant de supprimer la compétition
    if (competitionId) {
      const confirmDelete = confirm('Are you sure you want to delete?');
      if (confirmDelete) {
        this.competitionService.deleteCompetition(competitionId).subscribe(
          () => {
            // Rechargez les compétitions après la suppression
            this.loadCompetitions();
          },
          error => {
            console.error('Error deleting competition:', error);
          }
        );
      }
    } else {
      console.error('Competition ID is undefined.');
    }
  }
}
