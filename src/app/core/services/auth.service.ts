import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  host = 'http://localhost:8085/auth/';

  constructor(private http: HttpClient, private router: Router) {}

  // No change for createAccount - registration logic stays the same
  public createAccount(data: FormGroup): Observable<any> {
    return this.http.post<any>(this.host + 'signup', data);
  }

  // Modify the login method to skip actual authentication since backend always authenticates 'user1'
  public login(userName: string, password: string): Observable<any> {
    // Simulate a login request without actually sending user credentials
    // Since the backend always authenticates 'user1'
    const params = new HttpParams()
      .set('username', 'user1') // Always send 'user1' to match backend behavior
      .set('password', '1234');  // Password is also hardcoded as '1234'

    return this.http.post<any>(this.host + 'login', null, {
      params,
    });
  }

  // Forgot password and reset password logic stays the same
  public resetPassword(confirmationKey: string, newPassword: string): Observable<any> {
    const params = new HttpParams()
      .set('confirmationKey', confirmationKey)
      .set('newPassword', newPassword);
    return this.http.post<any>(this.host + 'reset-password', null, {
      params,
      responseType: 'text' as 'json',
    });
  }

  public forgotPassword(emailAddress: string): Observable<string> {
    const params = new HttpParams().set('emailAddress', emailAddress);
    return this.http.post<string>(this.host + 'forgot-password', null, {
      params,
      responseType: 'text' as 'json',
    });
  }

  // Local storage management stays the same
  public setToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getFromLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  // Logout method to clear localStorage and redirect to home page
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
