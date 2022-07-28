import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { CartService } from '../../services/cart.service';
import { ShoppingCart, LineItem } from '../../data/shopping-cart.model';
import { ProductTypeService } from '../../services/product-type.service';
import { ColorsService } from '../../services/colors.service';
import { SubCategoryService } from '../../services/sub-category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  @Input() data: any;
  @Input() background: any;
  @Input() catalogSection: boolean = false;
  @Input() text_only_catalog: boolean = false;
  @Output() itemAdded = new EventEmitter();
  product_type = "";
  activeBackground = "#ffffff";
  currentFilter = '';
  public production: boolean;

  constructor(public subCategoryService: SubCategoryService, public productTypeService: ProductTypeService, public productService: ProductService, public categoryService: CategoryService, private _cartService: CartService, public colorService: ColorsService) {
    this.production = environment.production;
  }

  ngOnInit(): void {

  }

  typeChanged() {
    this.productService.getAllByType(this.product_type);
  }

  addToCart(item: any): void {
    if (!this.isInCartAlready(item)) {
      this._cartService.cart.line_items?.push({ 'product': item, 'quantity': 1 });
      this.itemAdded.emit();
    }
  }

  private isInCartAlready(item: any): boolean {
    let lt = (this._cartService.cart.line_items && this._cartService.cart.line_items?.length) ? this._cartService.cart.line_items?.length : 0;
    let found = false;
    for (let index = 0; index < lt; index++) {
      const element = this._cartService.cart.line_items?.[index];
      if (element?.product._id === item._id) {
        found = true;
        break;
      }
    }

    return found;
  }

  onSubCategory(item: any, name: any, x: number): void {
    let element = document.getElementById(name) as HTMLInputElement;
    if (!(item.subCategorySelected && item.subCategorySelected.length))
      item.subCategorySelected = [];

    item.subCategorySelected[x] = { name: name, checked: element.checked };
    item.subCategorySelectedText = name;
    
    if (!this.production)
      console.log("onSubCategory", item);
  }

  onTypeSelect(item: any, at: number): void {
    item.subTypeSelected = (at + 1);
    item.subTypeSeletedText = item;
  }

  resetFilter(): void {
    this.currentFilter = '';
  }

  setFilter(filterCat: any): void {
    this.currentFilter = filterCat;
  }
}

