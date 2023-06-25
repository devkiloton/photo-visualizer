import { NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorMessageComponent } from '../form-error-message/form-error-message.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, FormErrorMessageComponent]
})
export class SignInComponent{
  fb = inject(NonNullableFormBuilder)
  authService = inject(AuthService)
  router = inject(Router)
  userNameInput!: ElementRef;

  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  });

  login() {
    if(this.loginForm.invalid) return;
    const userName = this.loginForm.get('userName')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService
      .authenticate(userName as string, password as string)
      .subscribe({
        next: () => this.router.navigate(['user', userName]),
        error: err => {
          console.log(err);
          this.loginForm.reset();
          alert('Invalid user name or password');
        }
      });
  }

}
