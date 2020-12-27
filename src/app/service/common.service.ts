import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public isSet(value: any): boolean {
    return value != undefined && value != null;
  }

  public normalizeName(name: string): string {
    return name ? name.replace(/\s/g, '') : '';
  }

}
