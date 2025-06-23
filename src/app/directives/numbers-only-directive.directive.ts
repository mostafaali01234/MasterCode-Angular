import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirectiveDirective {
constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = this.el.nativeElement as HTMLInputElement;
    const initialValue = input.value;

    // Keep only digits
    input.value = initialValue.replace(/[^0-9]/g, '');

    // Trigger input event if value changed
    if (initialValue !== input.value) {
      const newEvent = new Event('input', { bubbles: true });
      input.dispatchEvent(newEvent);
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    const pastedData = event.clipboardData?.getData('text') || '';
    // Allow paste only if data contains digits only
    if (!/^[0-9]*$/.test(pastedData)) {
      event.preventDefault();
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    // Allow control keys (e.g., backspace, delete, arrows)
    const allowedKeys = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'
    ];
    if (
      allowedKeys.includes(event.key) ||
      (event.key >= '0' && event.key <= '9')
    ) {
      return; // Allow key
    }
    event.preventDefault(); // Block non-numeric keys
  }

}
