import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  http = inject(HttpClient)
  
  checkUserNameTaken(userName: string) {
    return this.http.get(`http://localhost:3000/user/exists/${userName}`)
  }
}
