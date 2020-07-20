import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'slugify'})
export class SlugPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/ /g, '-');
  }
}
