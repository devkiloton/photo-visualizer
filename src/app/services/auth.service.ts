import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)

  authenticate(userName: string, password: string) {
    return this.http
      .post(
        'http://localhost:3000/user/login',
        { userName, password },
        { observe: 'response' }
      )
  }
}
