import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'backgroundImage'})
export class BackgroundImagePipe implements PipeTransform {

  transform(uri: string): string {
    return encodeURI(uri);
  }

}