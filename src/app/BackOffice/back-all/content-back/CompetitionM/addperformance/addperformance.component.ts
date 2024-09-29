import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Competition } from 'src/app/core/models/Competition';
import { Team } from 'src/app/core/models/Team';
import { Performance } from 'src/app/core/models/Performance';
import { CompetitionService } from 'src/app/core/services/competition.service';
import { PerformanceService } from 'src/app/core/services/performance.service';
import { Observable, of } from 'rxjs';
import { TeamdancersService } from 'src/app/core/services/teamdancers.service';

@Component({
  selector: 'app-addperformance',
  templateUrl: './addperformance.component.html',
  styleUrls: ['./addperformance.component.css']
})
export class AddperformanceComponent implements OnInit {
  performanceForm!: FormGroup;
  competitions$!: Observable<Competition[]>;
  teams$!: Observable<Team[]>;
  selectedCompetitionId: number = 0;
  selectedTeamId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private competitionService: CompetitionService,
    private teamService: TeamdancersService,
    private performanceService: PerformanceService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCompetitions();
  }

  initForm(): void {
    this.performanceForm = this.formBuilder.group({
      compId: ['', Validators.required],
      teamId: ['', Validators.required],
      perfdate: ['', Validators.required],
      starttime: ['', Validators.required], // Change type to string
      endtime: ['', Validators.required],   // Change type to string
      pdescreption: [''],
      perftitle: ['', Validators.required]
    });
  }

  loadCompetitions(): void {
    this.competitions$ = this.competitionService.getAllCompetitions();
  }

  onCompetitionSelected(event: any): void {
    const competitionId = event.target.value;
    if (competitionId && Number(competitionId) !== 0) {
      this.selectedCompetitionId = Number(competitionId);
      console.log(`Selected competition ID: ${this.selectedCompetitionId}`); // Log selected
      this.loadTeamsByCompetitionId(this.selectedCompetitionId);
    } else {
      this.selectedCompetitionId = 0;
      this.teams$ = of([]);
    }
  }

  loadTeamsByCompetitionId(competitionId: number): void {
    this.teams$ = this.teamService.getTeamsByCompetitionId(competitionId);
  }

  onTeamSelected(event: any): void {
    const teamId = event.target.value;
    if (teamId && Number(teamId) !== 0) {
      this.selectedTeamId = Number(teamId);
      console.log(`Selected team ID: ${this.selectedTeamId}`); // Log selected team ID
    } else {
      this.selectedTeamId = 0;
    }
  }

  onSubmit(): void {
    if (this.performanceForm.valid && this.selectedCompetitionId !== 0 && this.selectedTeamId !== 0) {
      const performanceData: Performance = {
        ...this.performanceForm.value,
        compId: this.selectedCompetitionId,
        teamId: this.selectedTeamId
      };

      // Convertir les champs de temps en objets Date
      performanceData.starttime = new Date(`2000-01-01T${performanceData.starttime}`);
      performanceData.endtime = new Date(`2000-01-01T${performanceData.endtime}`);

      this.performanceService.addPerformanceToTeamInCompetition(
        this.selectedCompetitionId,
        this.selectedTeamId,
        performanceData
      ).subscribe(
        (response) => {
          console.log('Performance ajoutée avec succès :', response);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la performance :', error);
          if (error.error && error.error.message) {
            console.error('Message d\'erreur du serveur :', error.error.message);
          }
        }
      );
    } else {
      console.log('Le formulaire est invalide ou la compétition/l\'équipe n\'a pas été sélectionnée');
    }
  }

}
