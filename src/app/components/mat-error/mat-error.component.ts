import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'tmb-mat-error',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule],
  templateUrl: './mat-error.component.html',
  styleUrls: ['./mat-error.component.scss'],
})
export class MatErrorComponent {
  control = input.required<AbstractControl>();
  label = input('');
  minLengthValue = input(2);
  maxLengthValue = input(255);
  validators = input<string[]>([]);
}
