import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'kmFormater' })

export class FormatkmPipe implements PipeTransform {
  transform(value: number): string {
    if (!value || value <= 0) return '0 Km';
   return Math.floor(value)+ 'Km'
  }
}