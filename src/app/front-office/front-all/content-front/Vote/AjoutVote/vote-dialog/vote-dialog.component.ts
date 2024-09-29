// vote-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Vote} from "../../../../../../core/models/Vote";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vote-dialog',
  templateUrl: './vote-dialog.component.html',
  styleUrls: ['./vote-dialog.component.css'],

})
export class VoteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<VoteDialogComponent>, private router: Router ,
    @Inject(MAT_DIALOG_DATA) public data: { vote: Vote }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitVote(): void {
    if (this.data.vote.score) {
      this.dialogRef.close(this.data.vote); // Close the dialog and send vote data
      this.dialogRef.afterClosed().subscribe(() => {
        // Navigate after the dialog has completely closed
        console.log('Navigating to result with ID:', this.data.vote.performance?.idperf);
        this.router.navigate(['/result', this.data.vote.performance?.idperf]);
      });
    } else {
      console.error('Vote submission failed: No score provided');
      // Optionally, show an error message to the user
    }
  }

}
