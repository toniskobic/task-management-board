import { Component, Input } from '@angular/core';
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
  @Input() control!: AbstractControl;
  @Input() label!: string;
  @Input() minLengthValue = 2;
  @Input() maxLengthValue = 255;
  @Input() validators: string[] = [];
}
