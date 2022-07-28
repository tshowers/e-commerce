import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerFilter'
})
export class CustomerFilterPipe implements PipeTransform {

  transform(value: any, filterName: string): any {
    if (!value) return;
    if (value.length === 0 || filterName === '') {
      return value;
    }
    const resultArray = [];

    for (const item of value) {
      let a = (item && item.first_name) ? item.first_name : '';
      let b = (item && item.last_name) ? item.last_name : '';
      let c = (item && item.email) ? item.email : '';
      let d = (item && item.phone) ? item.phone : '';
      let e = (item && item.customer_id) ? String(item.customer_id) : '';
      let f = (item && item.display_name) ? String(item.display_name) : '';
      let g = (item && item.phone_number) ? String(item.phone_number) : '';
      let h = (item && item.address1) ? String(item.address1) : '';
      let i = (item && item.city) ? String(item.city) : '';
      let j = (item && item.province) ? String(item.province) : '';
      let k = (item && item.zip) ? String(item.zip) : '';
      let l = (item && item.country) ? String(item.country) : '';
      let m = (item && item.dob) ? String(item.dob) : '';
      let n = (item && item.user_type) ? String(item.user_type) : '';
      let o = (item && item.cc_name_on_card) ? String(item.cc_name_on_card) : '';
      let p = (item && item.updated_by) ? String(item.updated_by) : '';


      if ((a.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (b.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (c.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (d.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (e.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (f.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (g.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (h.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (i.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (j.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (k.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (l.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (m.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (n.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (o.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (p.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
      ) {
        resultArray.push(item)
      }
    }
    return resultArray;
  }

}
