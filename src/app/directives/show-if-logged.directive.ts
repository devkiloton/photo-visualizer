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
  currentDisplay!: string;
  ngOnInit(): void {
    this.currentDisplay = getComputedStyle(this.el.nativeElement).display;
    this.userService.getUser().subscribe(user => {
      if(user){
        this.render.setStyle(this.el.nativeElement, 'display', this.currentDisplay)
      }else{
        this.currentDisplay = getComputedStyle(this.el.nativeElement).display;
        this.render.setStyle(this.el.nativeElement, 'display', 'none')
      }
    })
  }
}
