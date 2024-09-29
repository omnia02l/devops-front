import {Component, OnInit} from '@angular/core';
import { Vote } from 'src/app/core/models/Vote';
import { VoteService } from 'src/app/core/services/vote.service';

@Component({
  selector: 'app-list-vote',
  templateUrl: './list-vote.component.html',
  styleUrls: ['./list-vote.component.css']
})
export class ListVoteComponentF implements OnInit {

  votes: Vote[] = [];

  constructor(private voteService: VoteService) {}

  ngOnInit(): void {
    this.loadMyVotes();
  }

  loadMyVotes(): void {
    // Assuming we have a method to get the current user's ID
    const userId = this.getCurrentUser(); // Implement this method as per your auth logic
    this.voteService.getAllVotesByUser(userId).subscribe({
      next: (votes) => {
        this.votes = votes;
      },
      error: (error) => {
        console.error('Error fetching votes:', error);
      }
    });
  }

  getCurrentUser(): number {
    // Implement this based on your authentication mechanism
    return 1; // Dummy user ID for illustration
  }

  deleteVote(id: number): void {
    this.voteService.deleteVote(id).subscribe(
      () => {
        this.votes = this.votes.filter(vote => vote.idVote !== id);
        // Optionally, show a success message
      },
      error => {
        console.error('Error deleting vote', error);
        // Optionally, show an error message
      }
    );
  }

}
