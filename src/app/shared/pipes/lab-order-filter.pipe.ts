import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labOrderFilter'
})
export class LabOrderFilterPipe implements PipeTransform {

  transform(value: any, filterName: string): any {
    if (!value) return;
    if (value.length === 0 || filterName === '') {
      return value;
    }
    const resultArray = [];

    for (const item of value) {
      let a = (item && item.first_name) ? item.first_name : '';
      let b = (item && item.last_name) ? item.last_name : '';
      let c = (item && item.address1) ? item.address1 : '';
      let d = (item && item.city) ? item.city : '';
      let e = (item && item.email) ? item.email : '';
      let f = (item && item.company_name) ? item.company_name : '';
      let g = (item && item.kit_number) ? String(item.kit_number) : '';
      let h = (item && item.status) ? item.status : '';
      let i = (item && item.order_id) ? String(item.order_id) : '';
      let j = (item && item._id) ? String(item._id) : '';
      let k = (item && item.phone) ? String(item.phone) : '';
      let l = (item && item.order && item.order.cart && item.order.cart.line_items && item.order.cart.line_items.length && item.order.cart.line_items[0] && item.order.cart.line_items[0].product && item.order.cart.line_items[0].product.title) ? String(item.order.cart.line_items[0].product.title) : '';
      let m = (item && item.order && item.order.cart && item.order.cart.line_items && item.order.cart.line_items.length && item.order.cart.line_items[1] && item.order.cart.line_items[1].product && item.order.cart.line_items[1].product.title) ? String(item.order.cart.line_items[1].product.title) : '';


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
      ) {
        resultArray.push(item)
      }
    }
    return resultArray;
  }
}
