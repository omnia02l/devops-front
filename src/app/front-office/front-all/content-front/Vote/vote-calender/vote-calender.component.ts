import {Component, NgZone, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { VoteService } from 'src/app/core/services/vote.service';

@Component({
  selector: 'app-vote-calender',
  templateUrl: './vote-calender.component.html',
  styleUrls: ['./vote-calender.component.css']
})
export class VoteCalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    eventClick: (clickInfo) => {
      this.handleEventClick(clickInfo.event);
    },
  };  performanceId!: number;

  constructor(
    private voteService: VoteService,
    private route: ActivatedRoute,
    private zone: NgZone

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.performanceId = +params['performanceId'];
      this.loadVotes();
    });
  }

  loadVotes() {
    this.voteService.getVotesByPerformance(this.performanceId).subscribe(
      votes => {
        // Ensure prepareCalendarEvents is called within Angular's zone
        this.zone.run(() => {
          this.prepareCalendarEvents(votes);
        });
      },
      error => {
        console.log('Error fetching votes:', error);
      }
    );
  }


  prepareCalendarEvents(votes: any[]) {
    const events = votes.map(vote => ({
      title: `Score: ${vote.score} by ${vote.user.name}`,
      start: new Date(vote.voteDate),
      color: '#FFD54F', // You can customize this color as needed
      allDay: true
    }));

    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      events: events,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },

      eventClick: this.handleEventClick.bind(this),
      eventContent: this.eventRender.bind(this)
    };
  }

  handleEventClick(clickInfo: any) {
    // Handle event click, possibly navigate to detailed vote page or show vote details
    console.log('Event clicked:', clickInfo.event.title);
  }

  eventRender(args: any) {
    // Customize the appearance of events here if needed
  }
}
