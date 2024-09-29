import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Event} from "../models/event";
import {UserDTO} from "../models/userDTO";
import {EventParticipant} from "../models/EventParticipant";
import {MyEventResponse} from "../models/MyEventResponse";
import {AccountStatusStats} from "../models/AccountStatusStats";
import {EventStats} from "../models/EventStats";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  host = "http://localhost:8085/event/";

  constructor(private http: HttpClient, private router: Router) {
  }

  public listEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.host + "list-events")
  }

  public createEvent(event: Event): Observable<string> {
    return this.http.post<string>(this.host + "create", event, {responseType: 'text' as 'json'});
  }

  public updateParticipants(eventId: number, users: UserDTO[]): Observable<string> {
    const params = new HttpParams()
      .set('eventId', eventId);
    return this.http.post<string>(this.host + "update-participants", users, {
      params,
      responseType: 'text' as 'json'
    });
  }

  public acceptEvent(eventId: number): Observable<string> {
    const params = new HttpParams()
      .set('eventId', eventId);
    return this.http.post<string>(this.host + "accept-event", null, {
      params,
      responseType: 'text' as 'json'
    });
  }

  public rejectEvent(eventId: number): Observable<string> {
    const params = new HttpParams()
      .set('eventId', eventId);
    return this.http.post<string>(this.host + "reject-event", null, {
      params,
      responseType: 'text' as 'json'
    });
  }

  public listParticipants(eventId: number): Observable<EventParticipant[]> {
    const params = new HttpParams()
      .set('eventId', eventId);
    return this.http.get<EventParticipant[]>(this.host + "list-participants", {
      params
    });
  }

  public deleteEvent(eventId:number):Observable<string>{
    const params = new HttpParams()
      .set('eventId', eventId);
    return this.http.delete<string>(this.host + "delete-event", {
      params,
      responseType: 'text' as 'json'
    });
  }

  public listMyEvents(): Observable<MyEventResponse[]> {
    return this.http.get<MyEventResponse[]>(this.host + "list-my-events");
  }

  public getEventStats():Observable<EventStats>{
    return this.http.get<EventStats>(this.host+"get-event-stats");
  }

  public rateEvent(eventId: number, rate:number): Observable<string> {
    const params = new HttpParams()
      .set('eventId', eventId)
      .set('rate',rate);
    return this.http.post<string>(this.host + "rate-event", null, {
      params,
      responseType: 'text' as 'json'
    });
  }
  public getEventStatsById(id:number):Observable<EventStats>{
    return this.http.get<EventStats>(this.host+"get-event-stats-id/"+id);
  }
}
