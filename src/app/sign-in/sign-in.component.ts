import { NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorMessageComponent } from '../form-error-message/form-error-message.component';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { PlatformDetectorService } from '../services/platform-detector.service';

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, FormErrorMessageComponent, RouterModule]
})
export class SignInComponent implements AfterViewInit{
  fb = inject(NonNullableFormBuilder)
  authService = inject(AuthService)
  router = inject(Router)
  renderer = inject(Renderer2)
  platformDetectorService = inject(PlatformDetectorService)
  // Performant way to access the DOM element with the #userNameInput template variable 
  @ViewChild('userNameInput') userNameInput!: ElementRef<HTMLInputElement>;

  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  });

  public ngAfterViewInit(): void {
    this.renderer.selectRootElement(this.userNameInput.nativeElement).focus();
  }

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
          // antigo Pulo do gato: métodos não são acesiveis ao renderer, esse é o macete!
          // this.platformDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
          this.renderer.selectRootElement(this.userNameInput.nativeElement).focus();

          alert('Invalid user name or password');
        }
      });
  }

}
