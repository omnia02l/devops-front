import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CompetitionPerformanceDTO } from 'src/app/core/models/CompetitionPerformanceDTO';
import { PerformanceService } from 'src/app/core/services/performance.service';
import { VoteService } from 'src/app/core/services/vote.service';
import { VoteDialogComponent } from '../AjoutVote/vote-dialog/vote-dialog.component';

@Component({
  selector: 'app-vote-perf',
  templateUrl: './vote-perf.component.html',
  styleUrls: ['./vote-perf.component.css']
})
export class VotePerfComponent implements OnInit {
    competitionPerformances: CompetitionPerformanceDTO[] = [];
    goToVote(performanceId?: number): void {
      this.router.navigate(['/home/Vote/Ajoutvote', performanceId]);
    }
  
    userId: number = 1;  // Example static user ID
  
    showVoteCalendar(performanceId?: number): void {
      this.router.navigate(['/home/vote-calendar', performanceId]);
    }
    constructor(private performanceService: PerformanceService, private voteService: VoteService,  private dialog: MatDialog,
                private router : Router ) { }
  
    ngOnInit(): void {
      this.performanceService.getPerformancesByCompetition()
        .subscribe(data => {
          this.competitionPerformances = data;
        });
    }
  
    // part of listperformance.component.ts
    openVoteDialog(performanceId: number | undefined): void {
      const dialogRef = this.dialog.open(VoteDialogComponent, {
        panelClass: 'vote-dialog-container',
        width: '500px',
        height:'600px' ,
        data: { vote: { idVote: 0, score: 0, com: '', votedate: new Date(), performanceId: performanceId } }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.voteService.addVote(performanceId, this.userId, result).subscribe({
            next: response => console.log('Vote submitted successfully', response),
            error: error => console.error('Failed to submit vote', error)
          });
        }
      });
    }
  
  }
  