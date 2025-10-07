import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}

  showSnackbar(message: string, action: string = 'OK', duration: number = 3000, panelClass: string = 'snackbar-default') {
    this.snackBar.open(message, action, {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass
    });
  }

  // Optional helpers for different message types:
  success(message: string) {
    this.showSnackbar(message, 'Close', 3000, 'snackbar-success');
  }

  error(message: string) {
    this.showSnackbar(message, 'Close', 3000, 'snackbar-error');
  }

  warning(message: string) {
    this.showSnackbar(message, 'Close', 3000, 'snackbar-warning');
  }
}
