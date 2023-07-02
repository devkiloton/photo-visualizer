import { ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { Alert, AlertType } from '../types/alert';
import { AlertService } from '../services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AlertComponent {
detectorRef = inject(ChangeDetectorRef);
 @Input() timeout = 3000;
 alerts: Alert[] = [];
 alertService = inject(AlertService);

 constructor() { 
  this.alertService.getAlert().subscribe(alert => {
    if(!alert) return;
    this.alerts.push(alert);
    setTimeout(() => {
      this.removeAlert(alert)
      this.detectorRef.detectChanges();
    }, this.timeout);
    this.detectorRef.detectChanges();
  })
 }

 removeAlert(alertToRemove: Alert){
  this.alerts = this.alerts.filter(alert => alert != alertToRemove);
 }

 public getAlertClass(alert: Alert){
  if(!alert) return '';
  switch(alert.alertType){
    case AlertType.SUCCESS:
      return 'alert alert-success';
    case AlertType.DANGER:
      return 'alert alert-danger';
    case AlertType.INFO:
      return 'alert alert-info';
    case AlertType.WARNING:
      return 'alert alert-warning';
  }
 }

}
