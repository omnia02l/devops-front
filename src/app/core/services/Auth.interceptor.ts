import {Injectable} from "@angular/core";
import {
  HttpBackend,
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private httpclient!: HttpClient;

  constructor(private auth: AuthService, private router: Router, private http: HttpClient, private handler: HttpBackend) {
    this.httpclient = new HttpClient(handler);
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const Token = this.auth.getFromLocalStorage('accessToken');
    if (Token) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + Token),
      });
      return next.handle(cloned).pipe(
        catchError(err => {
          if (err.status === 401) {
            this.auth.logout();
          }
          return throwError(err);
        })
      );
    } else {
      return next.handle(req);   //pass
    }

  }

}
