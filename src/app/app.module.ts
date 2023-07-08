import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { FooterComponent } from './footer/footer.component';
import { ImmediateClickDirective } from './directives/immediate-click.directive';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { PhotoCommentsComponent } from './photo-comments/photo-comments.component';
import { AlertComponent } from './alert/alert.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
