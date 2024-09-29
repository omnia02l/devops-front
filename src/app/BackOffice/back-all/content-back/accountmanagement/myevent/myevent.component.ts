import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {EventService} from "../../../../../core/services/event.service";
import {MyEventResponse} from "../../../../../core/models/MyEventResponse";
import { UserDTO } from "../../../../../core/models/userDTO";
import { AccountService } from "../../../../../core/services/account.service";

@Component({
  selector: 'app-myevent',
  templateUrl: './myevent.component.html',
  styleUrls: ['./myevent.component.css'],
  providers:[MessageService]
})
export class MyeventComponent implements OnInit{
  principal!: UserDTO;
  myEvents:MyEventResponse[]=[];
  descriptionDialog:boolean =false;
  description!:string;
  items: MenuItem[];
  rate!:number

  constructor(private messageService:MessageService, private eventService:EventService, private accountService: AccountService)
  {
    this.getPrincipal();

    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home']},
      { label: 'My-events', icon: 'pi pi-fw pi-calendar', routerLink: ['/my-events']},
      { label: 'Training', icon: 'pi pi-fw pi-pencil',  routerLink: ['/training']},
      { label: 'My Post', icon: 'pi pi-fw pi-file', routerLink: ['/post'] },
      { label: 'All posts', icon: 'pi pi-fw pi-cog', routerLink: ['/all-post'] },
      { label: 'Profile', icon: 'pi pi-fw pi-cog', routerLink: ['/profile'] }
    ];
  }
  getPrincipal() {
    this.accountService.getPrincipal().subscribe({
      next: (data) => {
        this.principal = data;
      }
    });
  }

  ngOnInit(): void {
    this.listMyEvents();
  }

  showDescription(eventDescription: string) {
    this.description = eventDescription;
    this.descriptionDialog = true;
  }

  listMyEvents(){
    this.eventService.listMyEvents().subscribe({
      next:(data)=>{
        this.myEvents = data;
      },error:(err)=>{
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    })
  }

  accept(id:number) {
   this.eventService.acceptEvent(id).subscribe({
     next:(data)=>{
       this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
       this.listMyEvents();
     },error:(err)=>{
       this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
     }
   })
  }

  reject(id:number) {
    this.eventService.rejectEvent(id).subscribe({
      next:(data)=>{
        this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
        this.listMyEvents();
      },error:(err)=>{
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    })
  }
  sendRate(id:number) {
    this.eventService.rateEvent(id, this.rate).subscribe({
      next:(data)=>{
        this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
      },error:(err)=>{
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    })
  }

}


