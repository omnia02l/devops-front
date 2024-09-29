import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { TownWithVenuesDTO } from 'src/app/core/models/TownWithVenuesDTO';
import { TownandvenueserviceService } from 'src/app/core/services/townandvenueservice.service';

@Component({
  selector: 'app-listtownsandvenues',
  templateUrl: './listtownsandvenues.component.html',
  styleUrls: ['./listtownsandvenues.component.css']
})
export class ListtownsandvenuesComponent implements OnInit {
  townsWithVenues$!: Observable<TownWithVenuesDTO[]>;

  constructor(private townAndVenueService: TownandvenueserviceService) {}

  ngOnInit(): void {
    this.loadTownsAndVenues();
  }

  loadTownsAndVenues(): void {
    this.townsWithVenues$ = this.townAndVenueService.getAllTownsWithVenues();
 
  }
}
