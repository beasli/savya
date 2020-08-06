import { Pipe, PipeTransform } from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
@Pipe({name: 'slugify'})
export class SlugPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/ /g, '-');
  }
}

@Pipe({name: 'mcurrency'})
export class MyCurrencyPipe extends CurrencyPipe implements PipeTransform {
  transform(value: any, currencyCode: string, symbolDisplay = true, ): string {
    const currencyFormat = super.transform(value, currencyCode, symbolDisplay);
    const firstDigit = currencyFormat.search(/\d/);
    return currencyFormat.substring(0, firstDigit) + '  ' + currencyFormat.substr(firstDigit);
  }}

  @Pipe({name: 'summary'})
export class SummaryPipe implements PipeTransform {
    transform(value: string, args?: any) {
      if(!value)
        return null;

      return value.substr(0,500)+'...';
    }
}


