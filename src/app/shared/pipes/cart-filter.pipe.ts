import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cartFilter'
})
export class CartFilterPipe implements PipeTransform {

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
      let f = (item && item.user_type) ? String(item.user_type) : '';
      let g = (item && item.line_items && item.line_items[0] && item.line_items[0].product && item.line_items[0].product.title) ? item.line_items[0].product.title : '';
      let h = (item && item.line_items && item.line_items[1] && item.line_items[1].product && item.line_items[1].product.title) ? item.line_items[1].product.title : '';
      let i = (item && item.line_items && item.line_items[2] && item.line_items[2].product && item.line_items[2].product.title) ? item.line_items[2].product.title : '';
      let j = (item && item.line_items && item.line_items[0] && item.line_items[0].product && item.line_items[0].product.category) ? item.line_items[0].product.category : '';
      let k = (item && item.line_items && item.line_items[1] && item.line_items[1].product && item.line_items[1].product.category) ? item.line_items[1].product.category : '';
      let l = (item && item.line_items && item.line_items[2] && item.line_items[2].product && item.line_items[2].product.category) ? item.line_items[2].product.category : '';


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
      ) {
        resultArray.push(item)
      }
    }
    return resultArray;
  }

}
