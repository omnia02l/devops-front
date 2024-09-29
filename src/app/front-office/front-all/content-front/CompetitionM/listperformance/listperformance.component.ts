import { Component, OnInit } from '@angular/core';
import { PerformanceService } from 'src/app/core/services/performance.service';
import { CompetitionPerformanceDTO } from 'src/app/core/models/CompetitionPerformanceDTO';
import { Performance } from 'src/app/core/models/Performance';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadTicketDialogComponent } from '../../componentsTickets/file-upload-ticket-dialog/file-upload-ticket-dialog.component';





@Component({
  selector: 'app-listperformance',
  templateUrl: './listperformance.component.html',
  styleUrls: ['./listperformance.component.css']
})
export class ListperformanceComponent implements OnInit {
  competitionPerformances: CompetitionPerformanceDTO[] = [];

  constructor(private performanceService: PerformanceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.performanceService.getPerformancesByCompetition()
      .subscribe(data => {
        this.competitionPerformances = data;
      });
  }

  openDialog(): void {
    this.dialog.open(FileUploadTicketDialogComponent, {
      width: '250px'
    });
  }
}
