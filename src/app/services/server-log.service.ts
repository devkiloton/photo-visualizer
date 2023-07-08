import { Injectable, inject } from '@angular/core';
import { ServerLog } from '../types/server-log';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerLogService {
  http = inject(HttpClient)
  log(serverLog: ServerLog) {
    return this.http
    .post<ServerLog>('http://localhost:3001/infra/log', serverLog)
    .subscribe({
      next:() => console.log('Error logged on server'), 
      error: err => console.log("Fail to send error log to server")
    })
  }
}
