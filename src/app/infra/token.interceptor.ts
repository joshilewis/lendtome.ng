import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { AuthService } from "./auth/auth.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.currentToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.authService.currentToken}`
        }
      });
      return next.handle(request);
    }

    this.authService.token.subscribe(token => {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.authService.currentToken}`
        }
      });
      return next.handle(request);
    });
  }
}
