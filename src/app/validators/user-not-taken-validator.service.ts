import { Injectable, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, first, map, switchMap, timer } from 'rxjs';
import { SignUpService } from '../services/sign-up.service';

@Injectable()
export class UserNotTakenValidatorService {
// Async validator
  signUpService = inject(SignUpService)
  checkUserNameTaken() {
    return (control: AbstractControl) => {
      return control
      .valueChanges
      .pipe(debounceTime(300))
      .pipe(switchMap(userName => {
        return this.signUpService.checkUserNameTaken(userName)
      }))
      .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))
      .pipe(first())
    }
  }
}
