import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}
  @HostListener('click', ['$event.target'])
  onClick() {
    
    
    console.log('el', this.el);
    this.el.nativeElement.classList.add('active');

    /* if (this.el.nativeElement.style.backgroundColor === 'green' ) {
      this.el.nativeElement.style.backgroundColor = '';
    } else {
      this.el.nativeElement.style.backgroundColor = 'green';
    } */
  }
}
