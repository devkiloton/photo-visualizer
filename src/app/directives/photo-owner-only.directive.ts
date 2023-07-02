import { Directive, ElementRef, Input, OnInit, Renderer2, inject } from '@angular/core';
import { Photo } from '../types/photo';
import { UserService } from '../services/user.service';

@Directive({
  selector: '[photoOwnerOnly]',
  standalone: true
})
export class PhotoOwnerOnlyDirective implements OnInit {
  renderer = inject(Renderer2);
  el = inject(ElementRef);
  userService = inject(UserService);

  @Input() public ownedPhoto!: Photo;
  ngOnInit(): void {
      this.userService.getUser().subscribe(user => {
        if(!user || user.id !== this.ownedPhoto.userId){
          this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
        }
      })
  }
}
