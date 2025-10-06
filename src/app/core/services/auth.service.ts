import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}


   login(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post(environment.login, payload);
  }

  get getAccessToken(){
  return localStorage.getItem('token')
  }
}
