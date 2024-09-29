import {Component, OnInit} from '@angular/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import {TrainingService} from "../../../../../core/services/training.service";
import {MessageService} from "primeng/api";
import {
  Training,
  TrainingResponse,
  UpdateTrainingDatesRequest,
  UpdateTrainingRequest
} from "../../../../../core/models/Training";
import {Stats} from "../../../../../core/models/stats";
import {TrainingStatsWithCat} from "../../../../../core/models/TrainingStatsWithCat";

@Component({
  selector: 'app-trainingmanagement',
  templateUrl: './trainingmanagement.component.html',
  styleUrls: ['./trainingmanagement.component.css'],
  providers: [MessageService]
})
export class TrainingmanagementComponent implements OnInit {

  optionsChart:any;
  optionsChart2:any;
  stats!:Stats;
  data: any;
  data2: any;
  options: any;
  statsWithCat:TrainingStatsWithCat = {};
  currentDate = new Date();
  addTrainingDialog = false;
  submitted = false;
  coachesNames!: string[]
  hallsNames!: string[]
  categories!: string[]
  newTraining: Training = {};
  message!: string
  listTrainings:Training[]=[];
  trainingResponse:TrainingResponse={};
  trainingId!:number
  displayTrainingInformationDialog=false;
  updateTrainingDatesRequest:UpdateTrainingDatesRequest={};
  trainingToDeleteId!: number;
  deleteTrainingDialog: boolean=false;
  trainingToUpdate!: number;
  updateTrainingDialog: boolean=false;
  updatedTrainingInformation:UpdateTrainingRequest={};
  getWithCategory!:string;
  constructor(private trainingService: TrainingService, private messageService: MessageService) {
    this.categories = ['SALSA','URBAIN_DANCE','HIP_HOP','DANCE_CLASSIC'];
    this.getStats();
    this.listTraining();
    this.options = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      initialDate: this.currentDate,
      weekends: true,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      select: this.selectTimeForEvent.bind(this),
      eventClick: this.onEventClick.bind(this),
      eventChange: this.updateEventDateD.bind(this),
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      slotDuration: '00:15:00',
      snapDuration: '00:05:00'
    };
    this.listCoaches();
    this.listHallsNames();
    this.getStatsWithCat();
  }

  ngOnInit(): void {
  }

  listCoaches() {
    this.trainingService.listCoaches().subscribe({
      next: (data) => {
        this.coachesNames = data;
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server Error', life: 3000});
      }
    })
  }

  listTraining() {
    this.trainingService.listTraining().subscribe({
      next: (data) => {
        this.options.events=data;
        this.listTrainings = data;
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server Error', life: 3000});
      }
    })
  }

  listHallsNames() {
    this.trainingService.listDanceHallsNames().subscribe({
      next: (data) => {
        this.hallsNames = data;
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server Error', life: 3000});
      }
    })
  }


  toggleWeekends() {
    this.options.weekends = !this.options.weekends;
  }

  selectTimeForEvent(arg: any) {
    this.newTraining = {start: arg.start, end: arg.end};
    this.addTrainingDialog = true;
    this.submitted = false;
  }

  onEventClick(arg: any) {
    this.trainingId = arg.event.id;
    this.getTrainingResponse();
    this.displayTrainingInformationDialog=true;
  }

  updateEventDateD(arg: any) {
    this.updateTrainingDatesRequest = {id:arg.event.id,start:arg.event.start,end:arg.event.end}
    this.updateTrainingDates();
  }

  getTrainingResponse(){
    this.trainingService.getTrainingResponse(this.trainingId).subscribe({
      next:(data)=>{
        this.trainingResponse = data;
        console.log(this.trainingResponse);
      },error:(err)=>{
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    })
  }

  updateTrainingDates(){
    this.trainingService.updateTrainingDates(this.updateTrainingDatesRequest).subscribe({
      next: (data) => {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
        this.listTraining();
      },
      error: (err) => {
        const errObject = JSON.parse(err.error);
        this.message = errObject.message;
        this.messageService.add({severity: 'error', summary: 'Error', detail: this.message, life: 3000});
        this.listTraining();
      }
    });
  }

  createTraining() {
    console.log(this.newTraining)
    this.submitted = true;
    if (this.newTraining.trainingName && this.newTraining.danceHallName && this.newTraining.coachName) {
      this.trainingService.createTraining(this.newTraining).subscribe({
        next: (data) => {
          this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
          this.addTrainingDialog = false;
          this.listTraining();
        },
        error: (err) => {
          const errObject = JSON.parse(err.error);
          this.message = errObject.message;
          this.messageService.add({severity: 'error', summary: 'Error', detail: this.message, life: 3000});
          this.addTrainingDialog = false;
        }
      });
    }
  }

  confirmDelete() {
    this.trainingService.deleteTraining(this.trainingToDeleteId).subscribe({
      next: (data) => {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
        this.deleteTrainingDialog=false;
        this.displayTrainingInformationDialog=false;
        this.listTraining();
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server Error', life: 3000});
        this.deleteTrainingDialog = false;
        this.displayTrainingInformationDialog=false;
      }
    })
  }

  updateTraining() {
    this.submitted = true;
    if (this.updatedTrainingInformation.name && this.updatedTrainingInformation.coachName) {
      this.trainingService.updateTraining(this.trainingToUpdate,this.updatedTrainingInformation).subscribe({
        next: (data) => {
          this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
          this.updateTrainingDialog = false;
          this.displayTrainingInformationDialog = false;
          this.listTraining();
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server Error', life: 3000});
          this.updateTrainingDialog = false;
          this.displayTrainingInformationDialog = false;
        }
      });
    }
  }



  getStats(){
    this.trainingService.getStats().subscribe({
      next:(data)=>{
        this.stats=data;
        this.data = {
          labels: ['FULL','AVAILABLE'],
          datasets: [
            {
              data: [this.stats.full,this.stats.available],
              backgroundColor: [
                "#800080",
                "#0000FF"
              ],
              hoverBackgroundColor: [
                "#800080",
                "#0000FF"
              ]
            }
          ]
        };
        this.optionsChart = {
          plugins: {
            title: {
              display: true,
              text: 'Total Number of Training : '+ this.stats.total,
              fontSize: 25
            },
            legend: {
              position: 'top'
            }
          }
        };
      },error:(err)=>{
        console.log(err);
      }
    })
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

  getStatsWithCat(){
    this.trainingService.getStatsWithCat().subscribe({
      next:(data)=>{
        this.statsWithCat=data;
        this.data2 = {
          labels: ['SALSA','URBAIN_DANCE','HIP_HOP','DANCE_CLASSIC'],
          datasets: [
            {
              data: [this.statsWithCat.withA,this.statsWithCat.withB,this.statsWithCat.withC,this.statsWithCat.withD],
              backgroundColor: [
                "#800080",
                "#996665",
                "#524412",
                "#0000FF"
              ],
              hoverBackgroundColor: [
                "#800080",
                "#996665",
                "#524412",
                "#0000FF"
              ]
            }
          ]
        };
        this.optionsChart2 = {
          plugins: {
            title: {
              display: true,
              text: 'Training Details',
              fontSize: 25
            },
            legend: {
              position: 'top'
            }
          }
        };
      },error:(err)=>{
        console.log(err);
      }
    })
  }

}
