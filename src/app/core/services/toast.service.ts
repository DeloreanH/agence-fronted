import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'end',
    verticalPosition: 'top',
  };

  constructor(private snackBar: MatSnackBar) {}

  success(message: string, action?: string, config?: MatSnackBarConfig): void {
    const fallBackConfig = config ? config : Object.assign({}, this.defaultConfig, {panelClass: 'background-success'});
    this.snackBar.open(message, action, fallBackConfig);
  }

  error(message: string, action?: string, config?: MatSnackBarConfig): void {
    const fallBackConfig = config ? config : Object.assign({}, this.defaultConfig, {panelClass: 'background-danger'});
    this.snackBar.open(message, action, fallBackConfig);
  }

  warning(message: string, action?: string, config?: MatSnackBarConfig): void {
    const fallBackConfig = config ? config : Object.assign({}, this.defaultConfig, {panelClass: 'background-warning'});
    this.snackBar.open(message, action, fallBackConfig);
  }

  info(message: string, action?: string, config?: MatSnackBarConfig): void {
    const fallBackConfig = config ? config : Object.assign({}, this.defaultConfig, {panelClass: 'background-info'});
    this.snackBar.open(message, action, fallBackConfig);
  }
}
