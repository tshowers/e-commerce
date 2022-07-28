import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { ShoppingCartComponent } from 'src/app/shared/components/shopping-cart/shopping-cart.component';
import { MicroCheckOutComponent } from 'src/app/shared/components/micro-check-out/micro-check-out.component';
import { CheckOutComponent } from 'src/app/shared/components/check-out/check-out.component';
import { Catalog2Component } from 'src/app/shared/components/catalog2/catalog2.component';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ColorsService } from 'src/app/shared/services/colors.service';
import { ProductTypeService } from 'src/app/shared/services/product-type.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, OnDestroy {

  private _dataSubscription?: Subscription;

  @ViewChild(ShoppingCartComponent)
  private _shoppingCartComponent!: ShoppingCartComponent;

  @ViewChild(MicroCheckOutComponent)
  private _microCheckOutComponent!: MicroCheckOutComponent;

  @ViewChild(CheckOutComponent)
  private _checkOutComponent!: CheckOutComponent;


  @ViewChild(Catalog2Component)
  private _catalog2Component!: Catalog2Component;

  homeSection: boolean = true;
  aboutSection: boolean = true;
  checkOutSection: boolean = true;
  aboutProduct1: boolean = false;
  aboutProduct2: boolean = false;
  aboutProduct3: boolean = false;
  howTo: boolean = false;
  video1: boolean = false;
  video2: boolean = false;
  faq1: boolean = false;
  faq2: boolean = false;
  faq3: boolean = false;
  features1: boolean = false;
  features2: boolean = false;
  features3: boolean = false;
  color_block: boolean = false;
  text_only_catalog: boolean = false;
  medicalSection: boolean = false;
  catalogSection: boolean = true;
  subCategoryItems: any;
  products: any;
  allProducts: any;

  site_type: any = 'simple';

  data: any;
  public color = "#000000";
  public background = "#ffffff";
  public production: boolean;
  public imageIndex: number = 0;
  public isPractice: boolean = false;
  public isAdmin: boolean = false;

  private _appointmentsSubscription?: Subscription;
  private _subCategorySubscription?: Subscription;
  private _productSubscription?: Subscription;
  private _practiceSubscription?: Subscription;

  constructor(protected _dataService: DataService, public cartService: CartService, public userService: UserService,
    protected _categoryService: CategoryService,
    protected _subCategoryService: SubCategoryService,
    protected _productService: ProductService,
    protected _productTypeService: ProductTypeService
  ) {
    this.production = environment.production;
    this._dataService.getAll(environment.SETTINGS);
    this._productService.getAll();
    this._productTypeService.getAll();
    this._categoryService.getAll();
    this._subCategoryService.getAll();
  }

  ngOnInit(): void {
    this._dataSubscription = this._dataService.items?.subscribe((data) => {
      if (data && data.length && (data.length > 0)) {
        this.data = data[0];
        if (!this.production)
          console.log("Settings", this.data);

        if (data[0] && data[0].color) {
          this.color = data[0].color;
          this.background = ColorsService.hexToRGB(this.color);
        }

        // Pull site type from environment it it exist otherwise get from settings
        if (environment.site_type)
          this.site_type = environment.site_type
        else if (this.data.site_type)
          this.site_type = this.data.site_type;

        // Calculate random image for home section
        if (this.data && this.data.files && this.data.files.length)
          this.imageIndex = this.getRandomInt(this.data.files.length);


        this.setSectionsToDisplay();
      }
    });
    this.establishProducts();
    this.establishSubCategories();

    this.userService.practitioner$.subscribe((result) => {
      this.isPractice = result.valueOf();
    }) 
    this.userService.admin$.subscribe((result) => {
      this.isAdmin = result.valueOf();
    }) ;
  }

  ngOnDestroy(): void {
    if (this._dataSubscription)
      this._dataSubscription.unsubscribe();
    if (this._appointmentsSubscription)
      this._appointmentsSubscription.unsubscribe();
    if (this._subCategorySubscription)
      this._subCategorySubscription.unsubscribe();
    if (this._productSubscription)
      this._productSubscription.unsubscribe();

  }

  private establishProducts(): void {
    if (!this.production)
      console.log("Product Subscription");
    this._productSubscription = this._productService.items?.subscribe((products) => {
      this.allProducts = products;
      this.products = this.allProducts;
      if (!this.production)
        console.log("Total number ot products", this.allProducts.length);
    })

  }

  private establishSubCategories(): void {
    if (!this.production)
      console.log("Sub categories Subscription");
    this._subCategorySubscription = this._subCategoryService.items?.subscribe((items) => {
      this.subCategoryItems = items;
      if (!this.production)
        console.log("Total number ot sub categories", this.subCategoryItems.length);
    });


  }


  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  totalUp(): void {
    this._shoppingCartComponent.totalUp();
  }

  totalUpDropShippingCart(): void {
    this._shoppingCartComponent.totalUpDropShippingCart();
  }

  itemRemoved(): void {
    console.log("Item Removed");
    this._catalog2Component.checkCartDependency();
  }

  setSectionsToDisplay(): void {
    this.homeSection = (this.data.hasOwnProperty("home_section")) ? this.data.home_section : true;
    this.checkOutSection = (this.data.hasOwnProperty("checkout_section")) ? this.data.checkout_section : true;
    this.aboutSection = (this.data.hasOwnProperty("about_section")) ? this.data.about_section : false;
    this.aboutProduct1 = (this.data.hasOwnProperty("about_product1_section")) ? this.data.about_product1_section : false;
    this.aboutProduct2 = (this.data.hasOwnProperty("about_product2_section")) ? this.data.about_product2_section : false;
    this.aboutProduct3 = (this.data.hasOwnProperty("about_product3_section")) ? this.data.about_product3_section : false;
    this.howTo = (this.data.hasOwnProperty("how_to1_section")) ? this.data.how_to1_section : false;
    this.video1 = (this.data.hasOwnProperty("about_video1_section")) ? this.data.about_video1_section : false;
    this.video2 = (this.data.hasOwnProperty("about_video2_section")) ? this.data.about_video2_section : false;
    this.faq1 = (this.data.hasOwnProperty("about_faq1_section")) ? this.data.about_faq1_section : false;
    this.faq2 = (this.data.hasOwnProperty("about_faq2_section")) ? this.data.about_faq2_section : false;
    this.faq3 = (this.data.hasOwnProperty("about_faq3_section")) ? this.data.about_faq3_section : false;
    this.features1 = (this.data.hasOwnProperty("about_features1_section")) ? this.data.about_features1_section : false;
    this.features2 = (this.data.hasOwnProperty("about_features2_section")) ? this.data.about_features2_section : false;
    this.features3 = (this.data.hasOwnProperty("about_features3_section")) ? this.data.about_features3_section : false;
    this.color_block = (this.data.hasOwnProperty("color_block")) ? this.data.color_block : false;
    this.text_only_catalog = (this.data.hasOwnProperty("text_only_catalog")) ? this.data.text_only_catalog : false;
    this.medicalSection = (this.data.hasOwnProperty("medical_section")) ? this.data.medical_section : false;
    this.catalogSection = (this.data.hasOwnProperty("catalog_section")) ? this.data.catalog_section : this.catalogSection;
  }



}
