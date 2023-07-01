import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ImmediateClick]',
  standalone: true
})
export class ImmediateClickDirective implements OnInit {

  constructor(private element: ElementRef<any>, private renderer2: Renderer2) {}
  ngOnInit(): void {
    this.renderer2.selectRootElement(this.element.nativeElement).click();
  }
  

}
