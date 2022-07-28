import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderFilter'
})
export class OrderFilterPipe implements PipeTransform {

  transform(value: any, filterName: string): any {
    if (!value) return;
    if (value.length === 0 || filterName === '') {
      return value;
    }
    const resultArray = [];

    for (const item of value) {
      let a = (item && item.cart && item.cart.first_name) ? item.cart.first_name : '';
      let b = (item && item.cart && item.cart.last_name) ? item.cart.last_name : '';
      let c = (item && item.cart && item.cart.company_name) ? item.cart.company_name : '';
      let d = (item && item.cart && item.cart.email) ? item.cart.email : '';
      let e = (item && item.cart && item.cart.line_items && item.cart.line_items[0] && item.cart.line_items[0].product) ? item.cart.line_items[0].product.title : '';
      let f = (item && item.cart && item.cart.line_items && item.cart.line_items[1] && item.cart.line_items[1].product) ? item.cart.line_items[1].product.title : '';
      let g = (item && item.cart && item.cart.line_items && item.cart.line_items[2] && item.cart.line_items[2].product) ? item.cart.line_items[2].product.title : '';
      let h = (item && item.cart && item.cart.npi) ? item.cart.npi : '';
      let i = (item && item.cart && item.cart.prac_email) ? item.cart.prac_email : '';
      let j = (item && item.cart && item.cart.phone) ? String(item.cart.phone) : '';
      let k = (item && item.cart && item.cart.practitioner_name) ? item.cart.practitioner_name : '';
      let l = (item && item.cart && item.status) ? item.status : '';
      let m = (item && item.cart && item.cart.user_type) ? item.cart.user_type : '';
      let n = (item && item.cart && item.cart.zip) ? String(item.cart.zip) : '';
      let o = (item && item.charge_response && item.charge_response.balance_transaction) ? item.charge_response.balance_transaction : '';
      let p = (item && item.charge_response && item.charge_response.description) ? item.charge_response.description : '';
      let q = (item && item.charge_response && item.charge_response.id) ? String(item.charge_response.id) : '';
      let r = (item && item.charge_response && item.charge_response.status) ? item.charge_response.status : '';
      let s = (item && item.charge_response && item.charge_response.payment_method) ? item.charge_response.payment_method : '';
      let t = (item && item.charge_response && item.charge_response.outcome && item.charge_response.outcome.seller_message) ? item.charge_response.outcome.seller_message : '';
      let u = (item && item.charge_response && item.charge_response.outcome && item.charge_response.outcome.type) ? String(item.charge_response.outcome.type) : '';
      let v = (item && item.cart && item.cart.prac_first_name) ? item.cart.prac_first_name : '';
      let w = (item && item.cart && item.cart.prac_last_name) ? item.cart.prac_last_name : '';

      let a1 = (item && item.user && item.user.first_name) ? item.user.first_name : '';
      let b1 = (item && item.user && item.user.middle_name) ? item.user.middle_name : '';
      let c1 = (item && item.user && item.user.last_name) ? item.user.last_name : '';
      let d1 = (item && item.user && item.user.dob) ? item.user.dob : '';
      let e1 = (item && item.user && item.user.address1) ? item.user.address1 : '';
      let f1 = (item && item.user && item.user.city) ? item.user.city : '';
      let g1 = (item && item.user && item.user.zip) ? item.user.zip : '';
      let h1 = (item && item.user && item.user.phone_number) ? String(item.user.phone_number) : '';
      let i1 = (item && item.user && item.user.email) ? item.user.email : '';
      let j1 = (item && item.user && item.user.kit_number) ? String(item.user.kit_number) : '';
      let k1 = (item && item.user && item.user.passport_number) ? String(item.user.passport_number) : '';
      let l1 = (item && item.user && item.user.insurance_name) ? item.user.insurance_name : '';
      let m1 = (item && item.user && item.user.insurance_policy_number) ? String(item.user.insurance_policy_number) : '';
      let n1 = (item && item.user && item.user.practitioner_name) ? item.user.practitioner_name : '';
      let o1 = (item && item.user && item.user.prac_first_name) ? item.user.prac_first_name : '';
      let p1 = (item && item.user && item.user.prac_last_name) ? item.user.prac_last_name : '';
      let q1 = (item && item.user && item.user.company_name) ? item.user.company_name : '';

      let a2 = (item && item.appointment && item.appointment.firstName) ? item.appointment.firstName : '';
      let b2 = (item && item.appointment && item.appointment.lastName) ? item.appointment.lastName : '';
      let c2 = (item && item.appointment && item.appointment.calendar) ? item.appointment.calendar : '';
      let d2 = (item && item.appointment && item.appointment.category) ? item.appointment.category : '';
      let e2 = (item && item.appointment && item.appointment.date) ? item.appointment.date : '';
      let f2 = (item && item.appointment && item.appointment.type) ? item.appointment.type : '';
      let g2 = (item && item.appointment && item.appointment.phone) ? String(item.appointment.phone) : '';
      let h2 = (item && item.appointment && item.appointment.email) ? item.appointment.email : '';
      let i2 = (item && item.appointment && item.appointment.id) ? String(item.appointment.id) : '';
      let j2 = (item && item.appointment && item.appointment.type) ? item.appointment.type : '';
      let k2 = (item && item._id) ? String(item._id) : '';

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
        || (q.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (r.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (s.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (t.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (u.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (v.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (w.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (a1.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (b1.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (c1.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (d1.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (e1.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (f1.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (g1.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (h1.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (i1.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (j1.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (k1.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (l1.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (m1.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (n1.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (o1.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (p1.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (q1.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (a2.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (b2.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (c2.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (d2.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (e2.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (f2.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (g2.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (h2.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (i2.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (j2.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (k2.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
      ) {
        resultArray.push(item)
      }
    }
    return resultArray;
  }
}
