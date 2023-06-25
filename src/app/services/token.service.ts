import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  hasToken(): boolean {
    return !!this.getToken();
  }

  setToken(token: string): void {
    window.localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return window.localStorage.getItem('authToken');
  }

  removeToken(): void {
    window.localStorage.removeItem('authToken');
  }
}
