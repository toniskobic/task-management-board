import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) {}

  initSvgIcons(icons: string[]) {
    icons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `assets/svgs/${icon}.svg`
        )
      );
    });
  }

  getEnumNumberValues(enumObject: any) {
    const enumValues: number[] = [];
    for (const status in enumObject) {
      if (isNaN(Number(status))) {
        enumValues.push(enumObject[status]);
      }
    }
    return enumValues;
  }

  toSignalFromControl<T>(control: FormControl<T>) {
    return toSignal(control.valueChanges, { initialValue: control.value });
  }
}
