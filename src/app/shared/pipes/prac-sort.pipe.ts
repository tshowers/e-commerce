import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pracSort'
})
export class PracSortPipe implements PipeTransform {

  transform(data:any): any {
    if (!data) return;
    return data.sort((a: any, b: any) => {
      if (a && a.practitioner_name && b && b.practitioner_name) {
        if (a.practitioner_name.trim() > b.practitioner_name.trim()) return 1;
        if (a.practitioner_name.trim() < b.practitioner_name.trim()) return -1;
        }
      return 0;
    });
  }

}
