import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDTO} from "../models/userDTO";
import {FormGroup} from "@angular/forms";
import {SignupRequest} from "../models/signupRequest";
import {EditProfileRequest} from "../models/editProfileRequest";
import {UpdatePasswordRequest} from "../models/updatePasswordRequest";
import {Router} from "@angular/router";
import {AccountStatusStats} from "../models/AccountStatusStats";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  host = "http://localhost:8085/account/";

  constructor(private http: HttpClient, private router:Router) {
  }

  public listAccounts():Observable<UserDTO[]>{
    return this.http.get<UserDTO[]>(this.host+"list-accounts");
  }

  public banAccount(userName:string):Observable<void>{
    const params = new HttpParams()
      .set('userName', userName)
    return this.http.post<void>(this.host+"ban-account",null,{
      params
    });
  }

  public enableAccount(userName:string):Observable<void>{
    const params = new HttpParams()
      .set('userName', userName)
    return this.http.post<void>(this.host+"enable-account",null,{
      params
    });
  }

  public createAccount(data: SignupRequest): Observable<any> {
    return this.http.post<any>("http://localhost:8085/auth/signup", data);
  }

  public getPrincipal():Observable<UserDTO>{
    return this.http.get<UserDTO>(this.host+"profile");
  }

  public getAccountStatusStats():Observable<AccountStatusStats>{
    return this.http.get<AccountStatusStats>(this.host+"get-status-stats");
  }

  public editProfile(data:EditProfileRequest):Observable<string>{
    return this.http.post<string>(this.host+"edit-profile", data, {responseType:'text' as 'json'});
  }

  public updatePassword(data:UpdatePasswordRequest):Observable<string>{
    return this.http.post<string>(this.host+"update-password", data, {responseType:'text' as 'json'});
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
