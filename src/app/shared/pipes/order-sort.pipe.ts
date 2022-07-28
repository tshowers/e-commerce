import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderSort'
})
export class OrderSortPipe implements PipeTransform {

  transform(data: any): any {
    if (!data) return;
    return data.sort((a: any, b: any) => {
      let aDate = (a.updated_at) ? new Date(a.updated_at) : new Date();
      let bDate = (b.updated_at) ? new Date(b.updated_at) : new Date();

      if (aDate > bDate) return -1;
      if (aDate < bDate) return 1;
      return 0;
    });
  }

}
