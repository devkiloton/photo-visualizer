import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../types/user';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports:[NgIf, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  userService = inject(UserService)
  router = inject(Router)


  user!: User;
  user$ = this.userService.getUser()

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }

}
