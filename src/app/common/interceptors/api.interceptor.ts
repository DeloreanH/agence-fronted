import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let request = req;
    if (request.url.indexOf(':API_URL') > -1) {
      request = req.clone({url: this.parseURL(req.url) });
    }
    return next.handle(request);
  }

  private parseURL(url: string): string {
    const apiUrl = environment.api.url;
    url = url.replace(':API_URL', apiUrl);
    return url;
  }
}
