import { AbstractControl } from '@angular/forms';

export function noWhitespaceValidator(control: AbstractControl) {
  return control.value.length && control.value.trim().length === 0
    ? { whitespace: true }
    : null;
}
