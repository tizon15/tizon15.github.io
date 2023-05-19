import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  TemplateRef,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input() appHighlight: any;
  constructor(private el: ElementRef) {}
  @HostListener('click', ['$event.target'])
  onClick() {
    let parentElement = this.el.nativeElement.parentElement;
    let elNative = this.el.nativeElement;
    for (let index = 0; index < parentElement.length; index++) {
      const element = parentElement[index];
      if (element.classList.contains('active') && element !== elNative) {
        element.classList.remove('active');
      }
    }
    elNative.classList.toggle('active');
  }
}
