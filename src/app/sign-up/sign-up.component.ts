import { Component, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormErrorMessageComponent } from '../form-error-message/form-error-message.component';
import { NgIf } from '@angular/common';
import { lowerCaseValidator } from '../validators/lowerCase.validator';
import { UserNotTakenValidatorService } from '../validators/user-not-taken-validator.service';
import { NewUser } from '../types/newUser';
import { SignUpService } from '../services/sign-up.service';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports:[RouterModule, ReactiveFormsModule, FormErrorMessageComponent, NgIf],
})
export class SignUpComponent {

  fb = inject(NonNullableFormBuilder)
  userNotTakenValidatorService = inject(UserNotTakenValidatorService)
  signUpService = inject(SignUpService)
  router = inject(Router)

  signUpForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255), lowerCaseValidator], this.userNotTakenValidatorService.checkUserNameTaken()],
    password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(14)]]
  })
  
  signup(){
    const newUser = this.signUpForm.getRawValue() as NewUser;
    return this.signUpService.signUp(newUser).subscribe(() => this.router.navigate(['']))
  }

}
