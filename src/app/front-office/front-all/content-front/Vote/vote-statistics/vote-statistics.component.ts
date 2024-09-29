import {Component, OnInit} from '@angular/core';
import {VoteService} from "../../../../../core/services/vote.service";
import {ChartDataset, ChartOptions} from "chart.js";
import { LabelOptions } from 'chartjs-plugin-datalabels/types/options';



interface VoteStatistic {
  scoreType: string;
  count: number;
}

@Component({
  selector: 'app-vote-statistics',
  templateUrl: './vote-statistics.component.html',
  styleUrls: ['./vote-statistics.component.css']
})
export class VoteStatisticsComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: LabelOptions[] = [];
  public barChartData: ChartDataset[] = [
    { data: [], label: 'Votes' }
  ];

  constructor(private voteService: VoteService) {}

  ngOnInit(): void {
    this.voteService.getVoteStatistics().subscribe(data => {
      this.barChartData[0].data = data.map((item: any) => item[1]);
      this.barChartLabels = data.map((item: any) => item[0]);
    }, error => {
      console.error('There was an error!', error);
    });

  }


}
