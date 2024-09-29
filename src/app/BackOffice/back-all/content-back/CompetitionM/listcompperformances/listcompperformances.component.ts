import { Component, OnInit } from '@angular/core';
import { PerformanceService } from 'src/app/core/services/performance.service';
import { CompetitionPerformanceDTO } from 'src/app/core/models/CompetitionPerformanceDTO';
import { Performance } from 'src/app/core/models/Performance';

@Component({
  selector: 'app-listcompperformances',
  templateUrl: './listcompperformances.component.html',
  styleUrls: ['./listcompperformances.component.css']
})
export class ListcompperformancesComponent  implements OnInit {
  competitionPerformances: CompetitionPerformanceDTO[] = [];

  constructor(private performanceService: PerformanceService) { }

  ngOnInit(): void {
    this.performanceService.getPerformancesByCompetition()
      .subscribe(data => {
        this.competitionPerformances = data;
      });
  }
}
