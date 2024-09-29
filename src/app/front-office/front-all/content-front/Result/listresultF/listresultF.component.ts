import  { Component } from '@angular/core';

import {ChartType} from "chart.js";
import { Result } from 'src/app/core/models/Result';
import { ResultComment } from 'src/app/core/models/ResultComment';
import { ResultCommentService } from 'src/app/core/services/result-comment.service';
import { ResultService } from 'src/app/core/services/result.service';

@Component({
  selector: 'app-listresult',
  templateUrl: './listresultF.component.html',
  styleUrls: ['./listresultF.component.css']
})
export class ListresultFComponent {
  results: Result[] = [];
  editingResult?: Result;
  comments: any[] = [];
  newCommentContent: string = '';
  editMode: boolean = false;
  displayCreateCommentDialog: boolean = false;
  startDate: Date = new Date();
  endDate: Date = new Date();
  selectedResult: Result | null = null;
  displayDialog: boolean = false;


  public pieChartLabels: string[] = ['Score', 'Votes'];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';

  loadCommentsForResult(resultId: number): void {
    this.resultCommentService.getResultCommentById(resultId).subscribe(comments => {
      //this.comments = comments;
    });
  }

  constructor(private resultService: ResultService, private resultCommentService: ResultCommentService) {}

  ngOnInit(): void {
    this.resultService.getAllResults().subscribe(results => {
      this.results = results;
    });  }

  getAllResults(): void {
    this.resultService.getAllResults().subscribe({
      next: (data) => this.results = data,
      error: (e) => console.error(e)
    });
  }
  statistics: any;
  error: string | undefined;
  loadStatistics(resultId: number): void {
    this.resultService.getVoteStatistics(resultId).subscribe({
      next: (stats) => {
        this.statistics = stats;
        // Populate pie chart data
        this.pieChartData = [stats.averageScore, stats.totalVotes];
      },
      error: (error) => {
        console.error('There was an error fetching the statistics', error);
      }
    });
  }

  errorMessage: string = '';


  submitComment(resultId: number): void {
    if (this.newCommentContent.trim() === '') {
      alert('Veuillez saisir un commentaire');
      return;
    }
    const newComment: ResultComment = {
      idCom: 0,
      comment: this.newCommentContent,
      datecom: new Date(),
      result: undefined
    };

    const userId = 1;
    this.resultCommentService.addCommentToResult(resultId, userId, newComment).subscribe(
      () => {
        this.getAllResults();
        this.newCommentContent = '';
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
        if (error.status === 400) {
          this.errorMessage = "Le commentaire contient des mots inappropriés.";
        } else {
          this.errorMessage = "Une erreur s'est produite lors de l'ajout du commentaire.";
        }
      }
    );
  }
  cancelCreateComment(): void {
    this.displayCreateCommentDialog = false;
    this.newCommentContent = '';
  }


  refreshResults(): void {
    this.resultService.getAllResults().subscribe(results => {
      this.results = results;
    });
  }

  showDetails(id: number): void {
    console.log("Attempting to show details for ID:", id);
    this.resultService.getResultById(id).subscribe({
      next: (result) => {
        this.selectedResult = result;
        this.displayDialog = true;
      },
      error: (error) => console.error('Error fetching result details', error)
    });
  }

  likeResult(resultId: number): void {
    this.resultService.likeResult(resultId).subscribe(
      () => {
        this.getAllResults();
      },
      (error) => {
        console.log('Erreur lors de la tentative de like :', error);
        // Gestion des erreurs
      }
    );
  }

  dislikeResult(resultId: number): void {
    this.resultService.dislikeResult(resultId).subscribe(
      () => {
        this.getAllResults();

      },
      (error) => {
        console.log('Erreur lors de la tentative de dislike :', error);
        // Gestion des erreurs
      }
    );
  }


  protected readonly performance = performance;
}
