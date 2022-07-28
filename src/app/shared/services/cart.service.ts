import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IpService } from './ip.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../data/shopping-cart.model';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {

  private _itemDocs?: AngularFirestoreCollection;
  public items?: Observable<any[]>;
  public production: boolean = false;
  private _collectionName: string = environment.CARTS;
  private _ipSubscription?: Subscription;
  public savedCartID: any;

  public cart: ShoppingCart = <ShoppingCart>{
    line_items: [],
    created_at: new Date().getTime(),
    amount: 0,
    tax: 0,
    prac_pay: '',
    payment_details: {
      cc_bin: '',
      cc_company: '',
      cc_name_on_card: '',
      cc_number: ',',
      cc_exp_date: '',
      cvv_result_code: '',
      cc_security_code: ''
    },
    shipping_address: {
      address1: '',
      address2: '',
      city: '',
      province: '',
      province_code: '',
      zip: '',
      country: ''
    }
  };

  public ipAddress = '';
  public isAdmin: boolean = false;

  constructor(private _firestore: AngularFirestore, private _ipService: IpService, public userService: UserService) {
    this.production = environment.production;
    this.getIP();
    this.userService.admin$.subscribe((result) => {
      this.isAdmin = result.valueOf();
    });

  }


  public ngOnDestroy(): void {
    if (this._ipSubscription)
      this._ipSubscription.unsubscribe();
  }

  public reset(): void {
    this.cart = <ShoppingCart>{
      line_items: [],
      prac_pay: '',
      practitioner_name: '',
      npi: '',
      customer_id: '',
      prac_first_name: '',
      prac_last_name: '',
      prac_email: '',
      prac_phone: '',
      user_type: '',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      province: '',
      province_code: '',
      zip: '',
      country: '',
      shipping_required: true,
      tax: 0,
      status: '',
      gateway: '',
      fulfillment_status: '',
      financial_status: '',
      discounts: '',
      delivery_time: '',
      uid: '',
      created_at: new Date().getTime(),
      amount: 0,
      payment_details: {
        cc_bin: '',
        cc_company: '',
        cc_name_on_card: '',
        cc_number: ',',
        cc_exp_date: '',
        cvv_result_code: '',
        cc_security_code: ''
      },
      shipping_address: {
        first_name: '',
        last_name: '',
        address1: '',
        address2: '',
        city: '',
        province: '',
        province_code: '',
        zip: '',
        country: ''
      }
    };

  }

  get(ID: string) {
    return this._firestore.doc(this._collectionName + '/' + ID)
  }

  getAll() {
    this._itemDocs = this._firestore.collection(this._collectionName);
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  getAllPracSavedCarts(pracID: string) {
    this._itemDocs = this._firestore.collection(environment.SAVED_CARTS, ref => ref.where("customer_id", "==", pracID));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  getAllSavedCarts() {
    this._itemDocs = this._firestore.collection(environment.SAVED_CARTS);
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  getSavedCart(id: string) {
    return this._firestore.doc(environment.SAVED_CARTS + '/' + id).valueChanges({ idField: '_id' });
  }

  getSavedCartFromEmail(email: string) {
    return this._firestore.collection(environment.SAVED_CARTS, ref => ref.where("email", "==", email)).valueChanges({ idField: '_id' });
  }


  saveTempCart() {
    this.cart.browser_ip = this.ipAddress;
    this.cart.created_at = new Date().getTime();
    this.cart.environment = environment.firebaseConfig.projectId;

    // this._firestore.collection(environment.SAVED_CARTS).doc(email).set(this.cart);
    if (this.cart._id) {
      if (!this.production)
        console.log("Updating temp cart")
      this._firestore.collection(environment.SAVED_CARTS).doc(this.cart._id).set(this.cart);
    } else {
      if (!this.production)
        console.log("Saving new temp cart")
      this._firestore.collection(environment.SAVED_CARTS).add(this.cart).then((result) => {
        this.cart._id = result.id;
        // this.savedCartID = result.id;
      });
    }

  }

  delete(id: string) {
    this._firestore.collection(environment.SAVED_CARTS).doc(id).delete();
  }


  saveCart() {
    this.cart.browser_ip = this.ipAddress;
    this.cart.created_at = new Date().getTime();
    this.cart.environment = environment.firebaseConfig.projectId;
    if (!this.production)
      console.log("Cart User", this.userService.authService.firebaseUser)
    if (this.userService.authService.firebaseUser) {
      this.cart.uid = this.userService.authService.firebaseUser.uid;
      this._firestore.collection(environment.SAVED_CARTS).doc(this.cart.uid).set(this.cart, { merge: true });
    }
  }

  create(data: any) {
    data.browser_ip = this.ipAddress;
    data.created_at = new Date().getTime();


    if (this.userService.authService.firebaseUser)
      data.uid = this.userService.authService.firebaseUser.uid;
    return this._firestore.collection(this._collectionName).add(data);
  }

  private getIP() {
    this._ipSubscription = this._ipService.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    })
  }

  initCheckOutBasedOnUser(check_out: any, isPrac: boolean): void {
    let cid = (this.userService.authService.firebaseUser && this.userService.authService.firebaseUser.uid && this.userService.user && this.userService.user.user_type && (this.userService.user.user_type == 'practitioner')) ? this.userService.authService.firebaseUser.uid : '';
    if (this.userService.user && (!this.isAdmin) && this.userService.authService.firebaseUser) {
      // check_out.customer_id = (this.userService.user?.customer_id) ? this.userService.user?.customer_id : cid;
      check_out.practitioner_name = (this.userService.user?.practitioner_name) ? this.userService.user?.practitioner_name : '';
      check_out.prac_first_name = (this.userService.user?.prac_first_name) ? this.userService.user?.prac_first_name : '';
      check_out.prac_last_name = (this.userService.user?.prac_last_name) ? this.userService.user?.prac_last_name : '';
      check_out.prac_email = (this.userService.user?.email) ? this.userService.user.email : '';
      check_out.prac_phone = (this.userService.user?.phone_number) ? this.userService.user.phone_number : '';
      check_out.npi = (this.userService.user?.npi) ? this.userService.user?.npi : '';
      if (isPrac) {
        this.clearFormFields(check_out);
      } else {
        this.setFormFields(check_out);
      }
      check_out.shipping_first_name = '';
      check_out.shipping_last_name = '';
      check_out.shipping_address1 = '';
      check_out.shipping_address2 = '';
      check_out.shipping_city = '';
      check_out.shipping_province = '';
      check_out.shipping_zip = '';
      check_out.shipping_country = '';
    }
  }

  private setFormFields(check_out: any): void {
    check_out.company_name = (this.userService.user?.company_name) ? this.userService.user?.company_name : '';
    check_out.first_name = (this.userService.user?.first_name) ? this.userService.user?.first_name : '';
    check_out.last_name = (this.userService.user?.last_name) ? this.userService.user?.last_name : '';
    check_out.prac_email = (this.userService.user?.email) ? this.userService.user?.email : '';
    check_out.prac_phone = (this.userService.user?.phone_number) ? this.userService.user?.phone_number : '';
    // check_out.user_type = (this.userService.user?.user_type) ? this.userService.user?.user_type : '';
    check_out.billing_address1 = (this.userService.user?.address1) ? this.userService.user?.address1 : '';
    check_out.billing_address2 = (this.userService.user?.address2) ? this.userService.user?.address2 : '';
    check_out.billing_city = (this.userService.user?.city) ? this.userService.user?.city : '';
    check_out.billing_province = (this.userService.user?.province) ? this.userService.user?.province : '';
    check_out.billing_zip = (this.userService.user?.zip) ? this.userService.user?.zip : '';
    check_out.billing_country = (this.userService.user?.country) ? this.userService.user?.country : '';
    check_out.cc_name_on_card = (this.userService.user?.cc_name_on_card) ? this.userService.user?.cc_name_on_card : '';
    check_out.cc_number = (this.userService.user?.cc_number) ? this.userService.user?.cc_number.replace(/\s/g, "") : '';
    check_out.cc_exp_date = (this.userService.user?.cc_exp_date) ? this.userService.user?.cc_exp_date : '';
    check_out.email = (this.userService.user?.email) ? this.userService.user?.email : '';
    check_out.phone = (this.userService.user?.phone_number) ? this.userService.user?.phone_number : '';
  }

  private clearFormFields(check_out: any): void {
    check_out.company_name = '';
    check_out.first_name = '';
    check_out.last_name = '';
    check_out.prac_email = '';
    check_out.prac_phone = '';
    // check_out.user_type = (this.userService.user?.user_type) ? this.userService.user?.user_type : '';
    check_out.billing_address1 = '';
    check_out.billing_address2 = '';
    check_out.billing_city = '';
    check_out.billing_province = '';
    check_out.billing_zip = '';
    check_out.billing_country = '';
    check_out.cc_name_on_card = '';
    check_out.cc_number = '';
    check_out.cc_exp_date = '';
    check_out.email = '';
    check_out.phone = '';
  }


  public transferToCart(check_out: any, status: string): void {
    let cid = (this.userService.authService.firebaseUser && this.userService.authService.firebaseUser.uid) ? this.userService.authService.firebaseUser.uid : '';
    this.cart.prac_pay = (check_out.prac_pay) ? check_out.prac_pay : '';

    this.cart.practitioner_name = (check_out.practitioner_name) ? check_out.practitioner_name : '';
    this.cart.npi = (check_out.npi) ? check_out.npi : '';
    this.cart.company_name = (check_out.company_name) ? check_out.company_name : '';
    this.cart.customer_id = (check_out.customer_id) ? check_out.customer_id : cid;
    this.cart.prac_first_name = (check_out.prac_first_name) ? check_out.prac_first_name : '';
    this.cart.prac_last_name = (check_out.prac_last_name) ? check_out.prac_last_name : '';
    this.cart.prac_email = (check_out.prac_email) ? check_out.prac_email : '';
    this.cart.prac_phone = (check_out.prac_phone) ? check_out.prac_phone : '';


    if (check_out.hasOwnProperty("prac_pay") && check_out.prac_pay === 'patient') {
      if (!this.production)
        console.log("Setting user type in Cart to patient");
      this.cart.user_type = 'patient';
    }
    else {
      if (!this.production)
        console.log("Setting user type in Cart to whatever it was set to");
      this.cart.user_type = (check_out.user_type) ? check_out.user_type : '';
    }
    this.cart.first_name = (check_out.first_name) ? check_out.first_name : '';
    this.cart.last_name = (check_out.last_name) ? check_out.last_name : '';
    this.cart.email = (check_out.email) ? check_out.email : '';
    this.cart.phone = (check_out.phone) ? check_out.phone : '';
    this.cart.address1 = (check_out.billing_address1) ? check_out.billing_address1 : '';
    this.cart.address2 = (check_out.billing_address2) ? check_out.billing_address2 : '';
    this.cart.city = (check_out.billing_city) ? check_out.billing_city : '';
    this.cart.province = (check_out.billing_province) ? check_out.billing_province : '';
    this.cart.province_code = '';
    this.cart.zip = (check_out.billing_zip) ? check_out.billing_zip : '';
    this.cart.country = (check_out.billing_country) ? check_out.billing_country : '';
    this.cart.shipping_required = (check_out.shipping_required) ? check_out.shipping_required : '';

    if (check_out.billing_shipping) {
      if (this.cart.shipping_address) {
        if (!this.production)
          console.log("check_out.billing_shipping", check_out);

        this.cart.shipping_address.first_name = (check_out.first_name) ? check_out.first_name : '';
        this.cart.shipping_address.last_name = (check_out.last_name) ? check_out.last_name : '';
        this.cart.shipping_address.address1 = (check_out.billing_address1) ? check_out.billing_address1 : '';
        this.cart.shipping_address.address2 = (check_out.billing_address2) ? check_out.billing_address2 : '';
        this.cart.shipping_address.city = (check_out.billing_city) ? check_out.billing_city : '';
        this.cart.shipping_address.province = (check_out.billing_province) ? check_out.billing_province : '';
        this.cart.shipping_address.province_code = '';
        this.cart.shipping_address.zip = (check_out.billing_zip) ? check_out.billing_zip : '';
        this.cart.shipping_address.country = (check_out.billing_country) ? check_out.billing_country : '';
      }
    } else {
      if (this.cart.shipping_address) {
        if (!this.production)
          console.log("this.cart.shipping_address", check_out);

        this.cart.shipping_address.first_name = (check_out.shipping_first_name) ? check_out.shipping_first_name : '';
        this.cart.shipping_address.last_name = (check_out.shipping_last_name) ? check_out.shipping_last_name : '';
        this.cart.shipping_address.address1 = (check_out.shipping_address1) ? check_out.shipping_address1 : '';
        this.cart.shipping_address.address2 = (check_out.shipping_address2) ? check_out.shipping_address2 : '';
        this.cart.shipping_address.city = (check_out.shipping_city) ? check_out.shipping_city : '';
        this.cart.shipping_address.province = (check_out.shipping_province) ? check_out.shipping_province : '';
        this.cart.shipping_address.province_code = '';
        this.cart.shipping_address.zip = (check_out.shipping_zip) ? check_out.shipping_zip : '';
        this.cart.shipping_address.country = (check_out.shipping_country) ? check_out.shipping_country : '';
      }
    }


    this.cart.tax = 0;
    this.cart.status = status;

    this.cart.gateway = '';
    this.cart.fulfillment_status = '';
    this.cart.financial_status = '';
    this.cart.discounts = '';
    this.cart.delivery_time = check_out.delivery_time;

    if (!this.production)
      console.log("Check for payment details");

    if (this.cart.payment_details) {
      if (!this.production)
        console.log("Transfer payment info", check_out);
      this.cart.payment_details.cc_bin = '';
      this.cart.payment_details.cc_company = '';
      this.cart.payment_details.cc_name_on_card = (check_out.cc_name_on_card) ? check_out.cc_name_on_card : '';
      this.cart.payment_details.cc_number = (check_out.cc_number) ? check_out.cc_number : '';
      this.cart.payment_details.cc_exp_date = (check_out.cc_exp_date) ? check_out.cc_exp_date : '';
      this.cart.payment_details.cc_security_code = (check_out.cc_security_code) ? check_out.cc_security_code : '';
    }

    this.cart.uid = (this.userService.authService.firebaseUser) ? this.userService.authService.firebaseUser.uid : '';
  }

  refreshScreen(check_out: any, withOutCardInfo?: boolean) {
    if (!this.production)
      console.log("refreshScreen", check_out)

    if (!withOutCardInfo) {
      check_out.cc_name_on_card = this.cart.payment_details?.cc_name_on_card;
      check_out.cc_number = this.cart.payment_details?.cc_number;
      check_out.cc_exp_date = this.cart.payment_details?.cc_exp_date;
      check_out.cc_security_code = this.cart.payment_details?.cc_security_code;
    }

    check_out.company_name = (this.cart.company_name);
    check_out.first_name = (this.cart.first_name);
    check_out.last_name = (this.cart.last_name);
    check_out.email = (this.cart.email);
    check_out.phone = (this.cart.phone);
    check_out.billing_address1 = (this.cart.address1);
    check_out.billing_address2 = (this.cart.address2);
    check_out.billing_city = (this.cart.city);
    check_out.billing_province = (this.cart.province);
    check_out.province_code = '';
    check_out.billing_zip = (this.cart.zip);
    check_out.billing_country = (this.cart.country);
    check_out.shipping_first_name = (this.cart.shipping_address?.first_name);
    check_out.shipping_last_name = (this.cart.shipping_address?.last_name);
    check_out.shipping_address1 = (this.cart.shipping_address?.address1);
    check_out.shipping_address2 = (this.cart.shipping_address?.address2);
    check_out.shipping_city = (this.cart.shipping_address?.city);
    check_out.shipping_province = (this.cart.shipping_address?.province);
    check_out.shipping_zip = (this.cart.shipping_address?.zip);
    check_out.shipping_country = (this.cart.shipping_address?.country);
    check_out.customer_id = this.cart.customer_id;
    check_out.prac_email = this.cart.prac_email;
    check_out.prac_first_name = this.cart.prac_first_name;
    check_out.prac_last_name = this.cart.prac_last_name;
    check_out.practitioner_name = this.cart.practitioner_name;
    check_out.prac_phone = this.cart.prac_phone;
    check_out.prac_pay = this.cart.prac_pay;
  }

}
