import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { LineItem } from '../../data/shopping-cart.model';
import { ColorsService } from '../../services/colors.service';
import { ShoppingCart } from '../../data/shopping-cart.model';
import { Product } from '../../data/product.model';
import { UserService } from '../../services/user.service';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public total: number = 0;
  @Input() data: any;
  @Input() background = '#ffffff';
  @Input() text_only_catalog: boolean = false;
  @Output() itemRemoved = new EventEmitter();
  @Input() forPrac = false;

  constructor(public cartService: CartService, public colorService: ColorsService) { 

  }

  ngOnInit(): void {
    this.totalUp();
  }

  onIncrementeQuantity(item: LineItem): void {
    if (this.forPrac)
      this.onPracIncrementeQuantity(item);

    else if (item.quantity < 200) {
      item.quantity++;
      this.totalUp();
    }
  }

  onPracIncrementeQuantity(item: LineItem): void {
    if (item.quantity < 200) {
      item.quantity++;
      this.totalUpDropShippingCart();
    }
  }

  onDecrementQuantity(item: LineItem): void {
    if (this.forPrac) 
      this.onPracDecrementQuantity(item)
    else if (item.quantity > 1) {
      item.quantity--;
      this.totalUp();
    }
  }

  onPracDecrementQuantity(item: LineItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.totalUpDropShippingCart();
    }
  }

  removeItem(at: number): void {
    if (this.forPrac)
      this.removePracItem(at)
    else {
      this.cartService.cart.line_items?.splice(at, 1);
      this.totalUp();
      this.itemRemoved.emit();
      }  
  }

  removePracItem(at: number): void {
    this.cartService.cart.line_items?.splice(at, 1);
    this.totalUpDropShippingCart();
    this.itemRemoved.emit();
  }

  totalUpDropShippingCart(): void {
    this.total = 0;
    this.cartService.cart.line_items?.forEach(item => {
      if (item.product.calculatedPrice) {
        this.total += item.product.calculatedPrice;
      }
      else if (item.product.subTypeSelected) {
        if (item.product.subType[item.product.subTypeSelected - 1].on_sale) {
          this.total += (item.product.subType[item.product.subTypeSelected - 1].sale_price * item.quantity)
        }
        else {
          this.total += (item.product.subType[item.product.subTypeSelected - 1].price * item.quantity)
        }
      } else {
        if (item.product.on_sale)
          this.total += (item.product.sale_price * item.quantity)
        else
          this.total += (item.product.price * item.quantity)
      }
    });
    this.cartService.cart.amount = this.total.toFixed(2);
    // this.updateCart();
  }

  totalUp(): void {
    this.total = 0;
    this.cartService.cart.line_items?.forEach(item => {
      if (item.product.on_sale)
        this.total += (item.product.sale_price * item.quantity)
      else
        this.total += (item.product.price * item.quantity)
    });
    this.cartService.cart.amount = this.total.toFixed(2);
    // this.updateCart();
  }

  isProductDependency(): void {
    this.cartService.cart.line_items?.forEach(item => {
      if (item.product.dependency && item.product.dependency.price_dependent) {
        this.isCheckCartForDependentProducts(item.product)
      }
    })
  }

  isCheckCartForDependentProducts(product: any): void {
    let code = product.dependency?.dependency_code;
    this.cartService.cart.line_items?.forEach(item => {
      if (item.product._id != product._id) {
        if (item.product.dependency.dependency_code === code) {
          this.isCheckWhichOptionsAreChecked(product, item.product);
        }
      }
    })
  }

  isCheckWhichOptionsAreChecked(product: any, dependentProduct: any): void {

  }

  updateCart(): void {
    this.cartService.saveCart();
  }

}
