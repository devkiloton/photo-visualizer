import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../types/user';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { LoadingComponent } from '../loading/loading.component';
import { MenuComponent } from '../menu/menu.component';
import { ShowIfLoggedDirective } from '../directives/show-if-logged.directive';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports:[NgIf, AsyncPipe, RouterModule, AlertComponent, LoadingComponent, MenuComponent, ShowIfLoggedDirective],
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
