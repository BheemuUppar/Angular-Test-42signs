import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../../shared/services/snackbar.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authSerice = inject(AuthService);
  const snackbarService = inject(SnackbarService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Error:', error);

      if (error.status === 401) {
        // alert('Unauthorized! Logging out...');
        snackbarService.error("Unauthorized! Logging out...")
        authSerice.logout()

      } else if (error.status === 403) {
        // alert('Access forbidden.');
         snackbarService.error('Access forbidden.')
      } else if (error.status >= 500) {
        // alert('Server error occurred.');
        snackbarService.error('Server error occurred.')
      }

      return throwError(() => error);
    })
  )
};
