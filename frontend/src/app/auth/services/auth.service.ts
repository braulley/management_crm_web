import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/observable';


@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: {email: string, password: string}): Observable<boolean> {

    return this.http.post<any>(`${environment.api_url}/auth/login`, credentials)
    .do( data => {
      localStorage.setItem('token', JSON.stringify(data.token));
      localStorage.setItem('user', JSON.stringify(data.user));
    });

  }
}
