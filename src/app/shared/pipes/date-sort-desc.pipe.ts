import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateSortDesc'
})
export class DateSortDescPipe implements PipeTransform {

  transform(data:any): any {
    if (!data) return;
    return data.sort((a: any, b: any) => {
      if (a && a.updated_at && b && b.updated_at) {
        if (a.updated_at > b.updated_at) return 1;
        if (a.updated_at < b.updated_at) return -1;
        }
      return 0;
    });
  }
}
