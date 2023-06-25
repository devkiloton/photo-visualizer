import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  userService = inject(UserService)

  authenticate(userName: string, password: string) {
    return this.http
      .post(
        'http://localhost:3000/user/login',
        { userName, password },
        { observe: 'response' }
      ).pipe(tap(res => {
        const authToken = res.headers.get('x-access-token') ?? '';
        this.userService.setToken(authToken);
        console.log(`${userName} is authenticated with token ${authToken}`);
      }))
  }
}
