import {
  Directive,
  ElementRef,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appToggle]',
})
export class ToggleDirective {
  constructor(private el: ElementRef) {}

  /**
   * Method of the directive that every time the user clicks in one answer to check if other button is active in the row
   * and deactivate and activate the element clicked
   *
   * @memberof ToggleDirective
   */
  @HostListener('click', ['$event.target'])
  onClick(): void {
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
