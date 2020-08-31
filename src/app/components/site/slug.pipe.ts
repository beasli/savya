import { Pipe, PipeTransform } from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
@Pipe({name: 'slugify'})
export class SlugPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/ /g, '-');
  }
}


@Pipe({name: 'category'})
export class CategoryPipe implements PipeTransform {
  transform(value: string): string {

     value = value.replace(/ /g, '-');
     value = value.toLowerCase();
     value = value.replace('-jewellery', '');
    
      return value;
  }
}
@Pipe({name: 'subcategory'})
export class SubCategoryPipe implements PipeTransform {
  transform(value: string): string {

     value = value.replace(/ /g, '-');
     value = value.toLowerCase();
      return value;
  }
}

@Pipe({name: 'anti'})
export class AntiPipe implements PipeTransform {
  transform(value: string): string {

    // value = value.replace(/-/g, ' ');
     value = value.toUpperCase();
      return value;
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



@Pipe({
  name:'INRCurrency'
})
export class INRCurrencyPipe implements PipeTransform {
  transform(value:number): string{

      // value = Math.round(value);
      var result = value.toString().split('.');
      if(!result[1]){result[1] = "00";}else if(result[1].length <2){ result[1] = result[1]+"0"; }
      
      var lastThree = result[0].substring(result[0].length - 3);
      var otherNumbers = result[0].substring(0, result[0].length - 3);
      if (otherNumbers != '' && otherNumbers != '-')
          lastThree = ',' + lastThree;
      var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

      if (result.length > 1) {
          output += "." + result[1].substring(0, 2);
      }

      return "₹ "+output;

  }
}

