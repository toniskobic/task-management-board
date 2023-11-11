import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
import { DATETIME_OUTPUT_FORMAT } from '../constants/constants';

@Pipe({
  name: 'momentDate',
  standalone: true,
})
export class MomentDatePipe implements PipeTransform {
  transform(value: string, format?: string): string {
    const datetimeFormat = format || DATETIME_OUTPUT_FORMAT;
    return moment(value).format(datetimeFormat);
  }
}
