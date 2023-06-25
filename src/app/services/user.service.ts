import { Injectable, inject } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject, Observable, Subject, share, shareReplay } from 'rxjs';
import { User } from '../types/user';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  tokenService = inject(TokenService)
  userSubject = new BehaviorSubject<User>(null!);

  constructor() {
    this.tokenService.hasToken() && this.decodeAndNotify();
  }

  setToken(token: string): void {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  decodeAndNotify(): void {
    const token = this.tokenService.getToken() ?? '';
    const user = jwt_decode(token) as User;
    this.userSubject.next(user);
  }

  logout(): void {
    this.tokenService.removeToken();
    this.userSubject.next(null!);
  }

  isLogged(): boolean {
    return this.tokenService.hasToken();
  }

  getUserName(): string {
    return this.userSubject.value.name;
  }
}
