import {Component, OnInit} from '@angular/core';
import {Event} from "../../../../../core/models/event";
import {EventService} from "../../../../../core/services/event.service";
import {MessageService} from "primeng/api";
import {UserDTO} from "../../../../../core/models/userDTO";
import {AccountService} from "../../../../../core/services/account.service";
import {EventParticipant} from "../../../../../core/models/EventParticipant";
import {EventStats} from "../../../../../core/models/EventStats";
import {an} from "@fullcalendar/core/internal-common";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [MessageService]
})
export class EventComponent implements OnInit {

  eventList: Event[] = [];
  eventDialog: boolean = false;
  submitted: boolean = false;
  event: Event = {};
  description!: string;
  descriptionDialog: boolean = false;
  eventId!: number;
  addParticipantDialog: boolean = false;
  accountsList!: UserDTO[];
  participantsList: UserDTO[] = [];
  listParticipantsDialog: boolean = false;
  eventParticipants: EventParticipant[] = [];
  eventStats:EventStats = {};
  data:any
  optionsChart:any
  eventByIdStatsDialog=false;
  data1: any;
  constructor(private eventService: EventService, private accountService: AccountService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.listEvents();
    this.getListAccounts();
    this.getEventStats();
  }

  getListAccounts() {
    this.accountService.listAccounts().subscribe({
      next: (data) => {
        this.accountsList = data.reverse();
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    })
  }

  listEvents() {
    this.eventService.listEvents().subscribe({
      next: (data) => {
        this.eventList = data.reverse();
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    })
  }

  createEvent() {
    this.submitted = true;
    if (this.event.eventName && this.event.eventAddress && this.event.eventDate) {
      this.eventService.createEvent(this.event).subscribe({
        next: (data) => {
          this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
          this.eventDialog = false;
          this.submitted = false;
          this.listEvents();
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: ' Server error', life: 3000});
          this.eventDialog = false;
          this.submitted = false;
        }
      });
    }
  }

  showDescription(eventDescription: string) {
    this.description = eventDescription;
    this.descriptionDialog = true;
  }

  updateParticipants() {
    this.submitted = true;
    if (this.participantsList.length != 0) {
      this.eventService.updateParticipants(this.eventId, this.participantsList).subscribe({
        next: (data) => {
          this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
          this.addParticipantDialog = false;
          this.submitted = false;
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
          this.addParticipantDialog = false;
          this.submitted = false;
        }
      });
    }
  }

  listEventParticipants(id: number) {
    this.eventService.listParticipants(id).subscribe({
      next: (data) => {
        this.eventParticipants=data;
        this.listParticipantsDialog = true;
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: ' Server error', life: 3000});
      }
    })
  }

  deleteEvent(id: number) {
    this.eventService.deleteEvent(id).subscribe({
      next: (data) => {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
        this.listEvents();
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: ' Server error', life: 3000});
      }
    })
  }

  getEventStats(){
    this.eventService.getEventStats().subscribe({
      next:(data)=>{
        this.eventStats=data;
        this.data = {
          labels: ['REJECTED','ACCEPTED'],
          datasets: [
            {
              data: [this.eventStats.rejected,this.eventStats.accepted],
              backgroundColor: [
                "#A8043C",
                "#001F3F"
              ],
              hoverBackgroundColor: [
                "#A8043C",
                "#001F3F"
              ]
            }
          ]
        };
        this.optionsChart = {
          plugins: {
            title: {
              display: true,
              text: 'Total Number of Events : '+ this.eventStats.totalEventNumber,
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
  getEventStatsById(id: number) {
    this.eventByIdStatsDialog = true;
    this.eventService.getEventStatsById(id).subscribe({
      next:(data)=>{
        this.eventStats=data;
        this.data1 = {
          labels: ['REJECTED','ACCEPTED'],
          datasets: [
            {
              data: [this.eventStats.rejected,this.eventStats.accepted],
              backgroundColor: [
                "#A8043C",
                "#001F3F"
              ],
              hoverBackgroundColor: [
                "#A8043C",
                "#001F3F"
              ]
            }
          ]
        };
      },error:(err)=>{
        console.log(err);
      }
    })
  }
}
