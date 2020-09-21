import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../common/interfaces';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {

  constructor(private http: HttpClient) {
    super();
   }

   getConsultans(): Observable<IUser[]> {
    const apiUrl = `:API_URL/user/consultans`;
    const request = this.http.get(apiUrl);
    return this.fetch(request);
  }

}
