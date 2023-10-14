import { NgxMatDateFormats } from '@angular-material-components/datetime-picker';

export const DATETIME_FORMAT: NgxMatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY, HH:mm',
  },
  display: {
    dateInput: 'DD/MM/YYYY, HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMM YYYY',
  },
};
