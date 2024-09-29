
import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/core/models/Team';

import { TeamdancersService } from 'src/app/core/services/teamdancers.service';

@Component({
  selector: 'app-team-dancers',
  templateUrl: './team-dancers.component.html',
  styleUrls: ['./team-dancers.component.css']
})
export class TeamDancersComponent  implements OnInit {
  teamDancers!: Map<string, string[]>;

  constructor(private teamService: TeamdancersService) { }

  ngOnInit(): void {
    this.teamService.getTeamsWithDancers().subscribe((data: Map<string, string[]>) => {
      this.teamDancers = data;
    });
  }
}
