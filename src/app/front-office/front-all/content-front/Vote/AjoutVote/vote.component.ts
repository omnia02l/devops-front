import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgForm } from "@angular/forms";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import { Vote } from 'src/app/core/models/Vote';
import { VoteService } from 'src/app/core/services/vote.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css'],
})
export class VoteComponent implements OnInit {
  newVote: Vote = { idVote: 0,score: 0, com: '',votedate: new Date() , }; // Initialize with default values
  performanceId?: number;
  userId: number = 1;  // Example static user ID
  votes?: Vote[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private voteService: VoteService
  ) {}


  ngOnInit() {
    // Subscribe to the route parameters to get performanceId
    this.route.params.subscribe(params => {
      this.performanceId = +params['id'];
      this.loadAllVotesByUser(this.userId);

      if (!this.performanceId) {
        console.error('Invalid performance ID');
        this.router.navigate(['/error']); // Redirect to an error page or handle accordingly
      }
    });
  }

  loadAllVotesByUser(userId: number): void {
    this.voteService.getAllVotesByUser(userId).subscribe({
      next: (votes) => {
        this.votes = votes;
      },
      error: (error) => {
        console.error('Error fetching votes:', error);
      }
    });
  }

  addVote(form: NgForm): void {
    if (form.valid && this.performanceId) {
      this.voteService.addVote(this.performanceId, this.userId,  this.newVote).subscribe({
        next: (vote) => {
          console.log('Vote added', vote);
          form.reset();
          this.router.navigate(['/Result']);
        },
        error: (error) => console.error('Error adding vote', error)
      });
    } else {
      console.error('Form is invalid or performance ID is missing');
    }
  }

}
