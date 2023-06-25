import { Directive, ElementRef, HostListener, Input, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appDarkenOnHover]',
  standalone: true
})
export class DarkenOnHoverDirective {

  @Input() brightness = '70%';

  el = inject(ElementRef)
  // Use that to manipulate the DOM and doesn't have problems with SSR
  render = inject(Renderer2)

  @HostListener('mouseover')
  darkenOn() {
    this.render.setStyle(this.el.nativeElement, 'filter', `brightness(${this.brightness})`);
  }

  @HostListener('mouseleave')
  darkenOff() {
    this.render.setStyle(this.el.nativeElement, 'filter', 'brightness(100%)');
  }

}
