import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NewUser } from '../types/newUser';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  http = inject(HttpClient)
  
  checkUserNameTaken(userName: string) {
    return this.http.get(`http://localhost:3000/user/exists/${userName}`)
  }

  signUp(newUser: NewUser) {
    return this.http.post('http://localhost:3000/user/signup', newUser)
  }
}
