import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'backgroundColor'})
export class BackgroundColorPipe implements PipeTransform {

  transform(color: number): string {
    return '#' + this.componentToHex(color);
  }

  private componentToHex(c: number): string {
    var hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  }

}