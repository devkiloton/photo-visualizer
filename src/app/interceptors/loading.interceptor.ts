import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  loadingService = inject(LoadingService)

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(tap(event => {
      console.log(event)
      if(event instanceof HttpResponse){
        this.loadingService.stop()
        console.log('stop')
      }else{
        this.loadingService.start()
        console.log('start')
      }
      console.log('nothing')
    }));
  }
}
