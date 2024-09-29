import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {DanceHall} from "../models/DanceHall";
import {Training, TrainingResponse, UpdateTrainingDatesRequest, UpdateTrainingRequest} from "../models/Training";
import {Stats} from "../models/stats";
import {CoachStatus} from "../models/CoachStatus";
import {TrainingStatsWithCat} from "../models/TrainingStatsWithCat";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  host = "http://localhost:8085/training/";

  constructor(private http: HttpClient) {
  }

  public listDanceHalls(): Observable<DanceHall[]> {
    return this.http.get<DanceHall[]>(this.host + "list-dance-halls")
  }

  public changeDanceHallStatus(id: number): Observable<string> {
    const params = new HttpParams()
      .set('danceHallId', id)
    return this.http.post<string>(this.host + "update-dance-hall-status", null, {
      params,
      responseType: 'text' as 'json'
    });
  }

  public deleteDanceHallStatus(id: number): Observable<string> {
    const params = new HttpParams()
      .set('danceHallId', id)
    return this.http.delete<string>(this.host + "delete-dance-hall", {
      params,
      responseType: 'text' as 'json'
    });
  }

  public getTrainingResponse(trainingId: number): Observable<TrainingResponse> {
    const params = new HttpParams()
      .set('trainingId', trainingId)
    return this.http.get<TrainingResponse>(this.host + "training-response", {
      params
    });
  }

  public createDanceHall(danceHall: DanceHall): Observable<string> {
    return this.http.post<string>(this.host + "create-dance-hall", danceHall, {responseType: 'text' as 'json'});
  }

  public listCoaches(): Observable<string[]> {
    return this.http.get<string[]>(this.host + "list-coaches")
  }

  public listDanceHallsNames(): Observable<string[]> {
    return this.http.get<string[]>(this.host + "list-hall-names")
  }

  public listTraining(): Observable<Training[]> {
    return this.http.get<Training[]>(this.host + "list-training")
  }

  public createTraining(training: Training): Observable<string> {
    return this.http.post<string>(this.host + "create-training", training, {
      responseType: 'text' as 'json'
    });
  }

  public updateTrainingDates(updateTrainingDatesRequest: UpdateTrainingDatesRequest): Observable<string> {
    return this.http.post<string>(this.host + "update-training-dates", updateTrainingDatesRequest, {
      responseType: 'text' as 'json'
    });
  }

  public ifJoined(id: number): Observable<boolean> {
    const params = new HttpParams()
      .set('id', id)
    return this.http.get<boolean>(this.host + "if-joined", {
      params
    });
  }

  public joinTraining(id: number): Observable<string> {
    const params = new HttpParams()
      .set('id', id)
    return this.http.post<string>(this.host + "join-training", null, {
      params,
      responseType: 'text' as 'json'
    });
  }

  public cancelTraining(id: number): Observable<string> {
    const params = new HttpParams()
      .set('id', id)
    return this.http.post<string>(this.host + "cancel-training", null, {
      params,
      responseType: 'text' as 'json'
    });
  }

  public deleteTraining(id: number): Observable<string> {
    const params = new HttpParams()
      .set('id', id)
    return this.http.delete<string>(this.host + "delete-training", {
      params,
      responseType: 'text' as 'json'
    });
  }

  public updateTraining(id: number, data: UpdateTrainingRequest): Observable<string> {
    const params = new HttpParams()
      .set('id', id)
    return this.http.post<string>(this.host + "update-training", data, {
      params,
      responseType: 'text' as 'json'
    });
  }

  public getStats(): Observable<Stats> {
    return this.http.get<Stats>(this.host + "stats")
  }

  public getStatsWithCat(): Observable<TrainingStatsWithCat> {
    return this.http.get<TrainingStatsWithCat>(this.host + "stats-with-cat")
  }

  public getCoachStatus(): Observable<CoachStatus[]> {
    return this.http.get<CoachStatus[]>(this.host + "list-all-coach");
  }

  public changeStatus(id: number): Observable<string> {
    const params = new HttpParams()
      .set('id', id)
    return this.http.post<string>(this.host + "change-coach-status", null, {
      params,
      responseType: 'text' as 'json'
    });
  }

  listTrainingWithCategory(getWithCategory: string):Observable<Training[]> {
    return this.http.get<Training[]>(this.host + "list-training-with-category/"+ getWithCategory)
  }
}
