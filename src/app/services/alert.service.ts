import { Injectable, inject } from '@angular/core';
import { Alert, AlertType } from '../types/alert';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertSubject = new Subject<Alert>();
  router = inject(Router);
  keepAfterRouteChange = false;

  constructor(){
    this.router.events.subscribe(event => {
      if(this.keepAfterRouteChange){
        this.keepAfterRouteChange = false;
      } else {
        this.clear();
      }
    })
  }

  public success(message: string, keepAfterRouteChange: boolean = false): void {
    this.alert(AlertType.SUCCESS, message, keepAfterRouteChange);
  }

  public warning(message: string, keepAfterRouteChange: boolean = false): void {
    this.alert(AlertType.WARNING, message, keepAfterRouteChange);
  }

  public danger(message: string, keepAfterRouteChange: boolean = false): void {
    this.alert(AlertType.DANGER, message, keepAfterRouteChange);
  }

  public info(message: string, keepAfterRouteChange: boolean = false): void {
    this.alert(AlertType.INFO, message, keepAfterRouteChange);
  }

  private alert(alert: AlertType, message: string, keepAfterRouteChange: boolean): void {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.alertSubject.next(new Alert(alert, message));
  }

  getAlert() {
    return this.alertSubject.asObservable();
  }

  clear() {
    this.alertSubject.next(null as any);
  }
}
