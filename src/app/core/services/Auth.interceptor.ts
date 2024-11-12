// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add basic auth header for every request
    const username = 'user1';
    const password = '1234';
    const authHeader = 'Basic ' + btoa(username + ':' + password);

    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: authHeader
      }
    });

    return next.handle(clonedRequest);
  }
}
