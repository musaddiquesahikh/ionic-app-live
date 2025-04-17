import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCapitalizeInput]'
})
export class CapitalizeInputDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input') onInput(): void {
    const inputElement = this.el.nativeElement;
    inputElement.value = inputElement.value.toUpperCase();
  }
}