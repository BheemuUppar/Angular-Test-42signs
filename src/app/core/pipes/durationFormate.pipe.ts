import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatDuration' })
export class FormatDurationPipe implements PipeTransform {
  transform(value: number): string {
    if (!value || value <= 0) return '0 min';
    // Assuming value is in seconds
    const totalMinutes = Math.floor(value / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
  }
}