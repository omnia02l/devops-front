import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  host = "http://localhost:8085/auth/";

  constructor(private http: HttpClient, private router: Router) {
  }

  public createAccount(data: FormGroup): Observable<any> {
    return this.http.post<any>(this.host + "signup", data);
  }

  public login(userName: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', userName)
      .set('password', password);
    return this.http.post<any>(this.host + "login", null, {
      params
    })
  }

  public resetPassword(confirmationKey: string, newPassword: string): Observable<any> {
    const params = new HttpParams()
      .set('confirmationKey', confirmationKey)
      .set('newPassword', newPassword);
    return this.http.post<any>(this.host + "reset-password", null, {
      params,
      responseType: 'text' as 'json'
    })
  }

  public forgotPassword(emailAddress: string): Observable<string> {
    const params = new HttpParams()
      .set('emailAddress', emailAddress);
    return this.http.post<string>(this.host + "forgot-password", null, {
      params,
      responseType: 'text' as 'json'
    })
  }

  public setToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getFromLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

}
