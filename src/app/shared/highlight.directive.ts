import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
   constructor(private el: ElementRef) {}
  @HostListener('click', ['$event.target'])
  onClick() {
      this.el.nativeElement.classList.toggle('active');
  }
}
