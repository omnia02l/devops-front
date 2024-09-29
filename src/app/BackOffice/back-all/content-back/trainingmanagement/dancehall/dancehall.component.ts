import {Component, OnInit} from '@angular/core';
import {Table} from "primeng/table";
import {DanceHall} from "../../../../../core/models/DanceHall";
import {TrainingService} from "../../../../../core/services/training.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-dancehall',
  templateUrl: './dancehall.component.html',
  styleUrls: ['./dancehall.component.css'],
  providers: [MessageService]
})
export class DancehallComponent implements OnInit {

  newDanceHall: DanceHall = {}
  addDanceHallDialog = false;
  submitted = false;
  danceHallList: DanceHall[] = []
  changeStatusDialog = false;
  danceHallId!: number
  option!: string[];
  message!:string
  deleteDanceHallDialog=false;

  constructor(private trainingService: TrainingService, private messageService: MessageService) {
    this.listDanceHalls();
    this.option = ['AVAILABLE','NOT_AVAILABLE'];
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }


  ngOnInit(): void {
  }

  listDanceHalls() {
    this.trainingService.listDanceHalls().subscribe({
      next: (data) => {
        this.danceHallList = data.reverse();
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    })
  }

  changeDanceHallStatus() {
    this.trainingService.changeDanceHallStatus(this.danceHallId).subscribe({
      next: (data) => {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
        this.listDanceHalls();
        this.changeStatusDialog = false;
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    })
  }

  createDanceHall() {
    this.submitted = true;
    if (this.newDanceHall.hallName && this.newDanceHall.danceHallStatus && this.newDanceHall.hallAddress &&
    this.newDanceHall.danceHallStatus) {
      this.trainingService.createDanceHall(this.newDanceHall).subscribe({
        next: (data) => {
          this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
          this.addDanceHallDialog = false;
          this.listDanceHalls();
        },
        error: (err) => {
          const errObject = JSON.parse(err.error);
          this.message = errObject.message;
          this.messageService.add({severity: 'error', summary: 'Error', detail: this.message, life: 3000});
          this.addDanceHallDialog = false;
        }
      });
    }
  }

  confirmDelete() {
    this.trainingService.deleteDanceHallStatus(this.danceHallId).subscribe({
      next: (data) => {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
        this.deleteDanceHallDialog=false;
        this.listDanceHalls();
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server Error', life: 3000});
        this.deleteDanceHallDialog = false;
      }
    })
  }
}
