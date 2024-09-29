import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {CoachStatus} from "../../../../../core/models/CoachStatus";
import {TrainingService} from "../../../../../core/services/training.service";

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.css'],
  providers:[MessageService]
})
export class CoachComponent implements OnInit{

  allCoach:CoachStatus[]=[];
  constructor(private messageService:MessageService, private trainingService:TrainingService) {
  }

  ngOnInit(): void {
    this.getAllCoach();
  }

  getAllCoach(){
    this.trainingService.getCoachStatus().subscribe({
      next:(data) => {
        this.allCoach = data;
      },error:(err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    })
  }

  changeStatus(id:number) {
    this.trainingService.changeStatus(id).subscribe({
      next:(data) => {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
        this.getAllCoach();
      },error:(err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    })
  }
}
