import { Component, OnInit, inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { Observable, map } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from '../interceptors/loading.interceptor';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true,
  imports: [AsyncPipe, NgClass],
  providers:[{
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  }]
})
export class LoadingComponent implements OnInit {

  private loadingService = inject(LoadingService)
  public loading$!: Observable<string>;
  ngOnInit(): void {
   this.loading$ = this.loadingService.getLoading().pipe(map(loadingType => loadingType.valueOf()))
  }

}
