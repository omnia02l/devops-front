import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registration } from '../models/Registration';
import { RegistrationDTO } from '../models/RegistrationDTO';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
apiUrl = 'http://localhost:8085/registration';

  constructor(private http: HttpClient) { }

  getRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${this.apiUrl}/retrieve_all_regs`);
  }

  getRegistration(id: number): Observable<Registration> {
    return this.http.get<Registration>(`${this.apiUrl}/retrieve_reg/${id}`);
  }

  updateRegistration(registration: Registration): Observable<Registration> {
    const url = `${this.apiUrl}/update_reg/${registration.idreg}`;
    return this.http.put<Registration>(url, registration);
  }

  deleteRegistration(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove_reg/${id}`);
  }


  addRegistrationWithTeamAndDancers(registrationDTO: RegistrationDTO ): Observable<Registration> {
    return this.http.put<Registration>(`${this.apiUrl}/add_reg_with_team_and_dancers`, registrationDTO);
  }
  countPendingRegistrations(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/countPendingRegistrations`);

}

addRegistrationWithTeamAndDancersAssignComp(registrationDTO: RegistrationDTO, competitionId: number): Observable<Registration> {
  return this.http.put<Registration>(`${this.apiUrl}/add_reg_with_comp_team_and_dancers/${competitionId}`, registrationDTO);
}


sendEmailsToDancersInTeam(registrationId: number, subject: string, body: string): Observable<void> {
  const url = `${this.apiUrl}/${registrationId}/send-emails`;
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  const options = { headers: headers };

  const params = new HttpParams()
    .set('subject', subject)
    .set('body', body);
  return this.http.post<void>(url, null, { headers: headers, params: params });
}

}
