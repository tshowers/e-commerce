import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { UserService } from './user.service';
import { DataService } from './data.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from 'src/app/shared/data/user.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService implements OnDestroy {

  public errorMessage = new Subject<any>();
  public production: boolean;
  private _dataSubscription?: Subscription;
  private _userRetrieved: boolean = false

  constructor(public cartService: CartService, private _authService: AuthService, private _router: Router, private _userService: UserService, private _dataService: DataService) {
    this.production = environment.production;
  }

  ngOnDestroy(): void {
    if (this._dataSubscription)
      this._dataSubscription.unsubscribe();
  }


  public processOrder(check_out: any): void {
    this.cartService.transferToCart(check_out, "Pending");

    if (this.cartService.cart)
      this.cartService.cart.complete_order_url = environment.localURL + '/pending?id=';

    let email = (this._authService.firebaseUser) ? (this._authService.firebaseUser.email) : check_out.email;

    if (!this.production)
      console.log("Using Email for Checkout", email);

    if (this._authService.firebaseUser && this._authService.firebaseUser.email && this._userService.user && this._userService.user.email) {
      // Already Signed In

      if (!this.production)
        console.log("Already Logged In", email);

      this.cartService.cart.status = "Submitted";
      this.processAuthenticatedOrder();
      this.proceed(this._userService.user);
      this.removeTempCart();
    } else if (check_out.apple_auth) {

      if (!this.production)
        console.log("Apple Authentication", email);

      this.cartService.cart.status = "Submitted";
      this.appleAuthenticate(check_out);
      this.removeTempCart();
    } else if (check_out.email && check_out.email.endsWith('gmail.com')) {

      if (!this.production)
        console.log("Gmail Authentication", email);

      this.cartService.cart.status = "Submitted";
      this.gmailAuthenticate(check_out);
      this.removeTempCart();
    } else {

      if (!this.production)
        console.log("Passwordless Authentication", email);

      this.normalOrder(email);
      this.reset();
    }
  }

  private normalOrder(email: any): void {
    this.cartService.saveTempCart();
    this._authService.signInWithEmailAndCart(email);
    this._router.navigate(['thank-you']);
  }

  private reset(): void {
    setTimeout(() => {
      this.cartService.reset();
    }, 3000);
  }

  private async gmailAuthenticate(check_out: any) {
    let result = await this._authService.signInWithGoogle();
    if (result != null) {
      this.associateUser(check_out);
    } else {
      this.errorMessage.next("Unable to authenticate your email address");
      setTimeout(() => {
        this.errorMessage.next(undefined);
      }, 6000);
    }
  }

  private async associateUser(check_out: any) {
    if (this._authService.firebaseUser) {
      let user = await this.checkUser(this._authService.getFirestoreUser()?.uid, this._authService.getFirestoreUser()?.email);

      if (!this.production)
        console.log("Associated User", user);

      this._userService.create(user);
      this._userService.set(user);
      this.processAuthenticatedOrder();
      this.proceed(user);
    } else {
      this._router.navigate(['access']);
    }
  }

  private async checkUser(uid: any, email: any) {
    return new Promise((resolve, reject) => {
      this._dataService.get(environment.USERS, uid);
      this._dataSubscription = this._dataService.item?.pipe(take(1)).subscribe((u: any) => {
        if (!this.production)
          console.log("Retrieved User", u);

        if (u && u._id && u.email) {
          this._userService.user = u;
          resolve(u);
        }
        else {
          resolve(this.newUser(uid, email));
        }
      })
    })
  }

  private processAuthenticatedOrder(): void {
    if (!this.production)
      console.log("Processing Authenticated Cart", environment.CARTS, this.cartService.cart);

    this._userService.lastOrderID = this._dataService.addRecordReturnKey(environment.CARTS, this.cartService.cart);

    if (!this.production)
      console.log("Cart Created", this._userService.lastOrderID, this.cartService.cart);
  }

  removeTempCart(): void {
    if (!this.production)
      console.log("Trying to remove saved cart", this.cartService.savedCartID);

    if (this.cartService.savedCartID)
      this.cartService.delete(this.cartService.savedCartID);
  }

  private proceed(user: any): void {
    this.reset();
    if (user && user.roles) {
      this.proceedByRole(user);
    } else {
      this._router.navigate(['my']);
    }
  }

  private proceedByRole(user: any): void {
    if (user.roles.includes("admin"))
      this._router.navigate(['admin']);
    else if (user.roles.includes("reader"))
      this._router.navigate(['my']);
    else
      this._router.navigate(['my']);
  }

  private newUser(uid: any, email: any): User {
    let newUser = this._userService.getNewUser(uid, email);
    this.moveFromCartToUser(newUser);
    return newUser;
  }

  private moveFromCartToUser(user: User) {
    try {
      let cid = (this._authService.firebaseUser && this._authService.firebaseUser.uid) ? this._authService.firebaseUser.uid : '';
      if (this.cartService.cart) {
        user.company_name = (this.cartService.cart.company_name) ? this.cartService.cart.company_name : '';
        user.first_name = (this.cartService.cart.first_name) ? this.cartService.cart.first_name : '';
        user.last_name = (this.cartService.cart.last_name) ? this.cartService.cart.last_name : '';
        user.phone_number = (this.cartService.cart.phone) ? this.cartService.cart.phone : '';
        user.email = (this.cartService.cart.email) ? this.cartService.cart.email : '';
        user.address1 = (this.cartService.cart.address1) ? this.cartService.cart.address1 : '';
        user.address2 = (this.cartService.cart.address2) ? this.cartService.cart.address2 : '';
        user.city = (this.cartService.cart.city) ? this.cartService.cart.city : '';
        user.province = (this.cartService.cart.province) ? this.cartService.cart.province : '';
        user.province_code = (this.cartService.cart.province_code) ? this.cartService.cart.province_code : '';
        user.zip = (this.cartService.cart.zip) ? this.cartService.cart.zip : '';
        user.country = (this.cartService.cart.country) ? this.cartService.cart.country : '';
        if (this.cartService.cart.hasOwnProperty("prac_pay") && this.cartService.cart.prac_pay === 'patient') {
          if (!this.production)
            console.log("Setting user type to patient");
          user.user_type = 'patient';
        }
        else {
          if (!this.production)
            console.log("Setting user type to whatever it was set to");
          user.user_type = (this.cartService.cart.user_type) ? this.cartService.cart.user_type : '';
        }

        user.practitioner_name = (this.cartService.cart.hasOwnProperty("practitioner_name") && this.cartService.cart.practitioner_name) ? this.cartService.cart.practitioner_name : '';
        user.npi = (this.cartService.cart.hasOwnProperty("npi") && this.cartService.cart.npi) ? this.cartService.cart.npi : '';
        user.customer_id = (this.cartService.cart.hasOwnProperty("customer_id") && this.cartService.cart.customer_id) ? this.cartService.cart.customer_id : cid;
        user.prac_first_name = (this.cartService.cart.hasOwnProperty("prac_first_name") && this.cartService.cart.prac_first_name) ? this.cartService.cart.prac_first_name : '';
        user.prac_last_name = (this.cartService.cart.hasOwnProperty("prac_last_name") && this.cartService.cart.prac_last_name) ? this.cartService.cart.prac_last_name : '';

        if (this.cartService.cart.payment_details) {
          user.cc_company = (this.cartService.cart.payment_details.cc_company) ? this.cartService.cart.payment_details.cc_company : '';
          user.cc_name_on_card = (this.cartService.cart.payment_details.cc_name_on_card) ? this.cartService.cart.payment_details.cc_name_on_card : '';
          user.cc_number = (this.cartService.cart.payment_details.cc_number) ? this.cartService.cart.payment_details.cc_number : '';
          user.cc_exp_date = (this.cartService.cart.payment_details.cc_exp_date) ? this.cartService.cart.payment_details.cc_exp_date : '';
        }
      }
      if (!this.production)
        console.log("Cart and User Is:", user, this.cartService.cart);
    } catch (error) {
      console.error(error);
      this.errorMessage.next(error);
    }
  }

  private async appleAuthenticate(check_out: any) {
    let result = await this._authService.signInWithApple();
    if (result != null) {
      this.associateUser(check_out);
    } else {
      this.errorMessage.next("Unable to authenticate using Apple");
      setTimeout(() => {
        this.errorMessage.next(undefined)
      }, 6000);
    }
  }
}
