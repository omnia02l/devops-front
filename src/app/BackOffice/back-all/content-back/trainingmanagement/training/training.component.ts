import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import {TrainingService} from "../../../../../core/services/training.service";
import {Training, TrainingResponse} from "../../../../../core/models/Training";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
  providers: [MessageService]
})
export class TrainingComponent implements OnInit {
  options: any;
  currentDate = new Date();
  listTrainings: Training[] = [];
  trainingId!: number;
  displayTrainingInformationDialog = false;
  trainingResponse: TrainingResponse = {};
  participationStatus!: boolean;
  message!: string;
  items: MenuItem[];
  categories:string[];
  getWithCategory!: string;
  constructor(private messageService: MessageService, private trainingService: TrainingService) {
    this.categories = ['SALSA','URBAIN_DANCE','HIP_HOP','DANCE_CLASSIC'];
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home']},
      { label: 'My-events', icon: 'pi pi-fw pi-calendar', routerLink: ['/my-events']},
      { label: 'Training', icon: 'pi pi-fw pi-pencil',  routerLink: ['/training']},
      { label: 'My Post', icon: 'pi pi-fw pi-file', routerLink: ['/post'] },
      { label: 'All posts', icon: 'pi pi-fw pi-cog', routerLink: ['/all-post'] },
      { label: 'Profile', icon: 'pi pi-fw pi-cog', routerLink: ['/profile'] }
    ];
    this.listTraining();
    this.options = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, timeGridPlugin],
      initialDate: this.currentDate,
      weekends: true,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      eventClick: this.onEventClick.bind(this),
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      slotDuration: '00:15:00',
      snapDuration: '00:05:00'
    };
  }

  ngOnInit(): void {
  }

  listTraining() {
    this.trainingService.listTraining().subscribe({
      next: (data) => {
        this.options.events = data;
        this.listTrainings = data;
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server Error', life: 3000});
      }
    })
  }


  toggleWeekends() {
    this.options.weekends = !this.options.weekends;
  }


  onEventClick(arg: any) {
    this.trainingId = arg.event.id;
    this.getTrainingResponse();
    this.displayTrainingInformationDialog = true;
    this.ifJoined();
  }

  ifJoined() {
    this.trainingService.ifJoined(this.trainingId).subscribe({
      next: (data) => {
        this.participationStatus = data;
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    })
  }

  getTrainingResponse() {
    this.trainingService.getTrainingResponse(this.trainingId).subscribe({
      next: (data) => {
        this.trainingResponse = data;
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    })
  }

  join() {
    this.trainingService.joinTraining(this.trainingId).subscribe({
      next: (data) => {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
        this.displayTrainingInformationDialog = false;
        this.listTraining();
      },
      error: (err) => {
        const errObject = JSON.parse(err.error);
        this.message = errObject.message;
        this.messageService.add({severity: 'error', summary: 'Error', detail: this.message, life: 3000});
        this.displayTrainingInformationDialog = false;
        this.listTraining();
      }
    });
  }

  cancel() {
    this.trainingService.cancelTraining(this.trainingId).subscribe({
      next: (data) => {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
        this.displayTrainingInformationDialog = false;
        this.listTraining();
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
        this.displayTrainingInformationDialog = false;
        this.listTraining();
      }
    });
  }

  getListWithCategory() {
    this.trainingService.listTrainingWithCategory(this.getWithCategory).subscribe({
      next: (data) => {
        this.options.events=data;
        this.listTrainings = data;
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server Error', life: 3000});
      }
    })
  }
}
