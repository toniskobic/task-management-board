import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noWhitespaceValidator(
  control: AbstractControl
): ValidationErrors | null {
  return control.value.length && control.value.trim().length === 0
    ? { whitespace: true }
    : null;
}
