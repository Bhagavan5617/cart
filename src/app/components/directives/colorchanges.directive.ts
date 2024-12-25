import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appColorchanges]',
  standalone: true,
})
export class ColorchangesDirective {
  @Input() highLightColor: string = 'yellow';
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.hightlight(this.highLightColor);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.hightlight('');
  }

  private hightlight(color: string) {
    this.el.nativeElement.style.color = color;
  }
}
