import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'src/app/shared/services/user.service';
import { DataService } from 'src/app/shared/services/data.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { MicroCheckOutComponent } from 'src/app/shared/components/micro-check-out/micro-check-out.component';
import { ShoppingCartComponent } from 'src/app/shared/components/shopping-cart/shopping-cart.component';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { TestKitOrder } from 'src/app/shared/data/test-kit.model';
import { ShoppingCart } from 'src/app/shared/data/shopping-cart.model';
import { ColorsService } from 'src/app/shared/services/colors.service';
@Component({
  selector: 'app-activated-kit-lab-order-pairing',
  templateUrl: './activated-kit-lab-order-pairing.component.html',
  styleUrls: ['./activated-kit-lab-order-pairing.component.css']
})
export class ActivatedKitLabOrderPairingComponent implements OnInit, OnDestroy {
  private _dataSubscription?: Subscription;

  data: any;
  checkOutSection: boolean = true;
  public color = "#000000";
  public background = "#ffffff";
  public production: boolean;
  site_type: string = 'micro';

  @ViewChild(MicroCheckOutComponent)
  private _microCheckOutComponent!: MicroCheckOutComponent;

  @ViewChild(ShoppingCartComponent)
  private _shoppingCartComponent!: ShoppingCartComponent;


  constructor(private _dataService: DataService, public cartService: CartService, public userService: UserService, private _location: Location, public colorService: ColorsService) {
    this.production = environment.production;
    this._dataService.getAll(environment.SETTINGS);
  }

  ngOnInit(): void {
    this._dataSubscription = this._dataService.items?.subscribe((data) => {
      if (data && data.length && (data.length > 0)) {
        this.data = data[0];
        if (data[0] && data[0].color) {
          this.color = data[0].color;
          this.background = ColorsService.hexToRGB(this.color);
        }

        this.checkOutSection = (this.data.hasOwnProperty("checkout_section")) ? this.data.checkout_section : true;
      }
    })
  }

  ngOnDestroy(): void {
    if (this._dataSubscription)
      this._dataSubscription.unsubscribe();
  }

  back(): void {
    this._location.back()
  }

  totalUp(): void {
    this._shoppingCartComponent.totalUp();
  }

  onView(item: TestKitOrder): void {
    let cart = this.cartService.cart;

    if (!this.production)
      console.log(item, cart);

    this.moveOverCreditCardInfo(item, cart);
    this.moveOverDetails(item, cart);
    this.movefromCartToCheckOut();
  }

  private movefromCartToCheckOut(): void {
    this._microCheckOutComponent.refresh();
  }

  private moveOverCreditCardInfo(item: TestKitOrder, cart: ShoppingCart): void {
    if (item && item.order && item.order.cart && item.order.cart.payment_details) {
      if (cart.payment_details) {
        cart.payment_details.cc_bin = '';
        cart.payment_details.cc_company = '';
        cart.payment_details.cc_name_on_card = (item.order.cart.payment_details.cc_name_on_card) ? item.order.cart.payment_details.cc_name_on_card : '';
        cart.payment_details.cc_number = (item.order.cart.payment_details.cc_number) ? item.order.cart.payment_details.cc_number : '';
        cart.payment_details.cc_exp_date = (item.order.cart.payment_details.cc_exp_date) ? item.order.cart.payment_details.cc_exp_date : '';
        cart.payment_details.cc_security_code = (item.order.cart.payment_details.cc_security_code) ? item.order.cart.payment_details.cc_security_code : '';

        if (!this.production)
          console.log("Moving over -", cart);

      }
    }
  }

  private moveOverDetails(item: TestKitOrder, cart: ShoppingCart): void {
    if (item && item.order && item.order.cart) {
      cart.company_name = (item.order.cart.company_name) ? item.order.cart.company_name : '';
      cart.practitioner_name = (item.order.cart.practitioner_name) ? item.order.cart.practitioner_name : '';
      cart.customer_id = (item.order.cart.customer_id) ? item.order.cart.customer_id : '';
      cart.npi = (item.order.cart.npi) ? item.order.cart.npi : '';
      cart.first_name = (item.order.cart.first_name) ? item.order.cart.first_name : '';
      cart.last_name = (item.order.cart.last_name) ? item.order.cart.last_name : '';


      cart.email = (item.order.cart.email) ? item.order.cart.email : '';
      cart.phone = (item.order.cart.phone) ? item.order.cart.phone : '';
      cart.address1 = (item.order.cart.address1) ? item.order.cart.address1 : '';
      cart.address2 = (item.order.cart.address2) ? item.order.cart.address2 : '';
      cart.city = (item.order.cart.city) ? item.order.cart.city : '';
      cart.province = (item.order.cart.province) ? item.order.cart.province : '';
      cart.province_code = '';
      cart.zip = (item.order.cart.zip) ? item.order.cart.zip : '';
      cart.country = (item.order.cart.country) ? item.order.cart.country : '';

      if (cart.shipping_address && item.order.cart.shipping_address) {
        cart.shipping_address.address1 = (item.order.cart.shipping_address.address1) ? item.order.shipping_address.cart.address1 : '';
        cart.shipping_address.address2 = (item.order.cart.shipping_address.address2) ? item.order.shipping_address.cart.address2 : '';
        cart.shipping_address.city = (item.order.cart.shipping_address.city) ? item.order.cart.shipping_address.city : '';
        cart.shipping_address.province = (item.order.cart.shipping_address.province) ? item.order.cart.shipping_address.province : '';
        cart.shipping_address.province_code = '';
        cart.shipping_address.zip = (item.order.cart.shipping_address.zip) ? item.order.cart.shipping_address.zip : '';
        cart.shipping_address.country = (item.order.cart.shipping_address.country) ? item.order.cart.shipping_address.country : '';
      }

    }
  }




}
