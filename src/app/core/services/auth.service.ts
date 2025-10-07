import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router:Router, private snackbarService:SnackbarService) {}


   login(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post(environment.login, payload);
  }

  get getAccessToken(){
  return localStorage.getItem('token')
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('login');
    this.snackbarService.success("User logged out. Please login again")

  }

}
