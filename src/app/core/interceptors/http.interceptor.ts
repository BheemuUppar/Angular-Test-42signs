import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authSerice = inject(AuthService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Error:', error);

      if (error.status === 401) {
        alert('Unauthorized! Logging out...');
        authSerice.logout()

      } else if (error.status === 403) {
        alert('Access forbidden.');
      } else if (error.status >= 500) {
        alert('Server error occurred.');
      }

      return throwError(() => error);
    })
  )
};
