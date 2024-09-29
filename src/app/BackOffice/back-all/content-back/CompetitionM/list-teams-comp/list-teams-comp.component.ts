import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/core/models/Team';

import { TeamdancersService } from 'src/app/core/services/teamdancers.service';

@Component({
  selector: 'app-list-teams-dancers-comp',
  templateUrl: './list-teams-comp.component.html',
  styleUrls: ['./list-teams-comp.component.css']
})
export class ListTeamsCompComponent implements OnInit {

  competitionTeams!: Map<string, string[]>;

  constructor(private teamService: TeamdancersService) { }

  ngOnInit(): void {
    this.teamService.getCompetitionsWithTeams().subscribe((data: Map<string, string[]>) => {
      this.competitionTeams = data;
    });
  }
}

