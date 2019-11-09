import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkNull'
})
export class CheckNullPipe implements PipeTransform {

  transform(value: any): string {

    console.log("CheckNullPipe", value);

    if (value === "undefined" || value == null) {
        return "--";
    }

    if (String(value).trim().length > 0) {
        return value;
    }
    else {
       return "--";
    }
  }
}
