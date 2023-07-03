import { Directive, ElementRef, OnInit, Renderer2, inject } from '@angular/core';
import { UserService } from '../services/user.service';

@Directive({
  selector: '[showIfLogged]',
  standalone: true
})
export class ShowIfLoggedDirective implements OnInit{
  userService = inject(UserService)
  render = inject(Renderer2)
  el = inject(ElementRef)
  ngOnInit(): void {
    if(!this.userService.isLogged()){
      this.render.setStyle(this.el.nativeElement, 'display', 'none')
    }
  }
}
