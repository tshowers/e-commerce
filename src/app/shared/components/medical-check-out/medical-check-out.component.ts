import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataHandlerComponent } from 'src/app/shared/components/data-handler/data-handler.component';
import { DataService } from 'src/app/shared/services/data.service';
import { CheckoutService } from '../../services/checkout.service';
import { CartService } from '../../services/cart.service';
import { ColorsService } from '../../services/colors.service';
import { LabOrderService } from '../../services/lab-order.service';
import { UserService } from '../../services/user.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../../data/user.model';
import { Order } from '../../data/order.model';

export const GENDERS = [
  { 'name': 'Male', 'value': 'M' },
  { 'name': 'Female', 'value': 'F' },
];


@Component({
  selector: 'app-medical-check-out',
  templateUrl: './medical-check-out.component.html',
  styleUrls: ['./medical-check-out.component.css']
})
export class MedicalCheckOutComponent extends DataHandlerComponent implements OnInit, OnDestroy {

  @Input() companyData: any;
  @Input() showInsuranceUpload: boolean = true;
  @Input() showPassport: boolean = true;
  @Input() showLicenseUpload: boolean = true;
  @Input() showKitNumber: boolean = true;
  @Input() showSSN: boolean = true;
  @Input() heading: string = "Demographic Information";
  @Input() redirectText: string = '';
  @Input() redirect: any;
  @Input() showChinese : boolean = false;
  @Input() chargeResponse: string = "Insurance";
  @Input() signatureRequired: boolean = true;
  public diagnostic: boolean = false;
  public errorMessage: any;
  public production: boolean;
  private _errorSubscription?: Subscription;
  private _labOrder: any = {
    first_name: '',
    last_name: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    zip: '',
    country: '',
    status: "0",
    kit_number: '',
    passport_number: '',
    nationality: '',
    vaccinated: false,
    dob: '',
    gender: '',
    order_id: '',
    email: '',
    email_notification: false,
    text_notification: false,
    _id: ''
  };
  public check_out: any = {
    first_name: '',
    last_name: '',
    customer_id: '',
    practitioner_name: '',
    prac_first_name: '',
    prac_last_nam: '',
    prac_email: '',
    prac_phone: '',
    company_name: '',

    npi: '',

    address1: '',
    address2: '',
    city: '',
    province: '',
    province_code: '',
    zip: '',
    country: '',
    shipping_required: false,

    amount: 0,
    tax: 0,
    currency: '',

    line_items: [],
    gateway: '',
    fulfillment_status: '',
    financial_status: '',
    complete_order_url: '',

    email: '',
    phone: '',
    updated_at: new Date().getTime(),
    updated_by: '',
    created_by: '',
    created_at: new Date().getTime(),
    browser_ip: '',
    environment: '',

    discounts: '',

    user_type: 'patient',
    billing_shipping: true,
    prac_pay: this.chargeResponse,
    delivery_time: 'No',
    terms_of_service: false,
    status: 'Pending'

  };
  public GENDERS = GENDERS;
  public consent_authorization = false;

  isHovering: boolean = false;
  isHovering2: boolean = false;


  dropFiles: File[] = [];
  dropFiles2: File[] = [];

  resultsFile: any;
  resultsFile2: any;

  uploadProgress: any;
  uploadProgress2: any;

  uploaded: boolean = false;
  private _ref?: AngularFireStorageReference;
  private _task?: AngularFireUploadTask;
  private _taskSubscription?: Subscription;

  order: any;

  constructor(private _labOrderService: LabOrderService, private _storage: AngularFireStorage, protected _dataService: DataService, private _router: Router, public cartService: CartService, public colorService: ColorsService, public userService: UserService, private _checkoutService: CheckoutService) {
    super(_dataService);
    this.production = environment.production;

  }

  ngOnInit(): void {
    this.setUser();
    this.initData();
    setTimeout(() => {
      this.setUser()
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this._errorSubscription)
      this._errorSubscription.unsubscribe();
  }

  dateFocusOut() : void {

    let d = new Date(this.data.dob);
    let before = new Date("1900-01-01");
    let after = new Date("2022-01-01");

    if (!this.production)
      console.log("focusOut", before.toLocaleDateString(), after.toLocaleDateString(), d);

    if (d > before && d < after) {
      console.log("true");
    }
    else {
      console.log("false");
      this.data.dob = undefined;
    } 

    
  }

  onSubmit(): void {
    this.transferToCart();
    this.order = <Order>{
      cart: this.check_out,
      user: this.data,
      charge_response: this.chargeResponse,
      status: "Pending",
      email: this.data.email
    }
    // super.onSubmit(environment.USERS);
    this.saveOrder();
    this.initScreen();

  }

  saveOrder(): void {
    try {
      if (!this.production)
      console.log("Saving", this.order);
      
      this._dataService.add(environment.ORDERS, this.order).then((result) => {
        this.order._id = result.id;
        this._labOrder.order_id = this.order._id;
        this.createLabOrder();
        this.complete();
      })
    } catch (error) {
      console.error(error);
    }

  }

  createLabOrder(): void {
    this._labOrderService.create(this._labOrder);
  }

  setUser(): void {
    if (!this.production)
      console.log("User", this.userService.user);
      

    this.data = <User>{
      first_name: (this.userService.user && this.userService.user.first_name) ? this.userService.user.first_name : '',
      middle_name: (this.userService.user && this.userService.user.middle_name) ? this.userService.user.middle_name : '',
      last_name: (this.userService.user && this.userService.user.last_name) ? this.userService.user.last_name :'',
      dob: (this.userService.user && this.userService.user.dob) ? this.userService.user.dob :'',
      gender: (this.userService.user && this.userService.user.gender) ? this.userService.user.gender :'',
      ssn: (this.userService.user && this.userService.user.ssn) ? this.userService.user.ssn :'',
      email: (this.userService.user && this.userService.user.email) ? this.userService.user.email :'',
      kit_number: '',
      passport_number: (this.userService.user && this.userService.user.passport_number) ? this.userService.user.passport_number :'',
      nationality: (this.userService.user && this.userService.user.nationality) ? this.userService.user.nationality :'',
      vaccinated: (this.userService.user && this.userService.user.vaccinated) ? this.userService.user.vaccinated :false,
      phone_number: (this.userService.user && this.userService.user.phone_number) ? this.userService.user.phone_number :'',
      address1: (this.userService.user && this.userService.user.address1) ? this.userService.user.address1 :'',
      address2: (this.userService.user && this.userService.user.address2) ? this.userService.user.address2 :'',
      city: (this.userService.user && this.userService.user.city) ? this.userService.user.city :'',
      province: (this.userService.user && this.userService.user.province) ? this.userService.user.province :'',
      zip: (this.userService.user && this.userService.user.zip) ? this.userService.user.zip :'',
      country: (this.userService.user && this.userService.user.country) ? this.userService.user.country :'',
      has_insurance: false,
      insurance_name: (this.userService.user && this.userService.user.insurance_name) ? this.userService.user.insurance_name :'',
      insurance_policy_number: (this.userService.user && this.userService.user.insurance_policy_number) ? this.userService.user.insurance_policy_number :'',
      insurance_group_number: (this.userService.user && this.userService.user.insurance_group_number) ? this.userService.user.insurance_group_number :'',
      insurance_suffix_number: (this.userService.user && this.userService.user.insurance_suffix_number) ? this.userService.user.insurance_suffix_number :'',
    };
    this.data.license = {
      imageURL: []
    };
    this.data.insurance_card = {
      imageURL: []
    };

  }

  initData(): void {
    this.data.license = {
      imageURL: []
    };
    this.data.insurance_card = {
      imageURL: []
    };
    this.dropFiles = [];
    this.dropFiles2 = [];

    this.resultsFile = null;
    this.resultsFile2 = null;

    this.uploadProgress = null;
    this.uploadProgress2 = null;
    this.consent_authorization = false;

  }

  setOrder(): void {
    this.order = <Order>{
      user: this.data,
      charge_response: this.chargeResponse,
      status: ""
    }
  }

  setCheckOut(): void {
    this.check_out = {
      first_name: '',
      last_name: '',
      customer_id: '',
      practitioner_name: '',
      prac_first_name: '',
      prac_last_nam: '',
      prac_email: '',
      prac_phone: '',
      company_name: '',

      npi: '',

      address1: '',
      address2: '',
      city: '',
      province: '',
      province_code: '',
      zip: '',
      country: '',
      shipping_required: false,

      amount: 0,
      tax: 0,
      currency: '',

      line_items: [],
      gateway: '',
      fulfillment_status: '',
      financial_status: '',
      complete_order_url: '',

      email: '',
      phone: '',
      updated_at: new Date().getTime(),
      updated_by: '',
      created_by: '',
      created_at: new Date().getTime(),
      browser_ip: '',
      environment: '',

      discounts: '',

      user_type: 'patient',
      billing_shipping: true,
      prac_pay: this.chargeResponse,
      delivery_time: 'No',
      terms_of_service: false,
      status: 'Pending'
    }

    this._labOrder = {
      first_name: '',
      last_name: '',
      address1: '',
      address2: '',
      city: '',
      province: '',
      zip: '',
      country: '',
      status: "0",
      kit_number: '',
      passport_number: '',
      nationality: '',
      vaccinated: false,
      dob: '',
      gender: '',
      order_id: '',
      email: '',
      email_notification: false,
      text_notification: false,

    }
  }

  transferToCart(): void {
    console.log("DATA =", this.data);
    this.check_out.address1 = this.data.address1;
    this.check_out.address2 = this.data.address2;
    this.check_out.city = this.data.city;
    this.check_out.province = this.data.province;
    this.check_out.country = this.data.country;
    this.check_out.zip = this.data.zip;
    this.check_out.first_name = this.data.first_name;
    this.check_out.last_name = this.data.last_name;
    this.check_out.email = this.data.email;
    this.check_out.phone = this.data.phone_number;
    this.check_out.practitioner_name = "N/A";
    this.check_out.created_at = new Date().getTime();
    this.check_out.amount = 0;
    this.transferToLabOrder();
  }

  transferToLabOrder(): void {
    this._labOrder = {
      first_name: this.data.first_name,
      last_name: this.data.last_name,
      address1: this.data.address1,
      address2: this.data.address2,
      city: this.data.city,
      province: this.data.province,
      zip: this.data.zip,
      country: this.data.country,
      status: "0",
      kit_number: this.data.kit_number,
      dob: this.data.dob,
      gender: this.data.gender,
      email: this.data.email,
      email_notification: false,
      text_notification: false,
    }

  }



  initScreen(): void {
    this.transaction_complete = true;
    this.setUser();
    this.initData();
    setTimeout(() => {
      this.setOrder();
      this.transaction_complete = false;
      this.setCheckOut();
      if (this.redirect)
        window.location.href = this.redirect;

      if (!this.production)
        console.log("Redirecting to:", this.redirect);  

    }, (this.redirect) ? 60000 : 180000);
  }



  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  toggleHover2(event: boolean) {
    this.isHovering2 = event;
  }

  onDrop(files: FileList) {
    try {
      for (let i = 0; i < files.length; i++) {
        let f = files.item(i);
        if (f)
          this.dropFiles.push(f);
      }
      this.uploaded = true;
    } catch (error) {
      console.error("ON DROP");
      this.uploaded = false;
    }
  }

  onDrop2(files: FileList) {
    try {
      for (let i = 0; i < files.length; i++) {
        let f = files.item(i);
        if (f)
          this.dropFiles2.push(f);
      }
      this.uploaded = true;
    } catch (error) {
      console.error("onDrop2");
      this.uploaded = false;
    }
  }



  onDeleteImageFile(file: any, at: number): void {
    if (file && file.url) {
      this._storage.refFromURL(file.url).delete();
      this.data.license.imageURL.splice(at, 1);
    }
  }

  onDeleteImage2File(file: any, at: number): void {
    if (file && file.url) {
      this._storage.refFromURL(file.url).delete();
      this.data.insurance_card.imageURL2.splice(at, 1);
    }
  }



  uploadImage(event: any) {
    try {
      const path = environment.FILE_PATH + `/${Date.now()}_${event.target.files[0].name}`;

      this.processImageUpload(event, path);
    } catch (error) {
      console.error("UPLOAD", error);
    }
  }

  uploadImage2(event: any) {
    try {
      const path = environment.FILE_PATH + `/${Date.now()}_${event.target.files[0].name}`;

      this.processImageUpload2(event, path);
    } catch (error) {
      console.error("UPLOAD", error);
    }
  }




  processImageUpload(event: any, path: string): void {
    try {
      this._ref = this._storage.ref(path);
      this._task = this._storage.upload(path, event.target.files[0])
      this.uploadProgress = this._task.percentageChanges();
      this._taskSubscription = this._task.snapshotChanges().pipe(
        finalize(async () => {
          const downloadURL = await this._storage.ref(path).getDownloadURL().toPromise();
          this.uploaded = true;
          this.data.license.imageURL.push({
            'name': event.target.files[0].name,
            'url': downloadURL,
            'uploaded_at': new Date().getTime()
          });
        })
      ).subscribe();
    } catch (error) {
      console.error("PROCESS UPLOAD", error);
    }
  }

  setDiagnostic(): void {
    this.diagnostic = !this.diagnostic;
  }


  processImageUpload2(event: any, path: string): void {
    try {
      this._ref = this._storage.ref(path);
      this._task = this._storage.upload(path, event.target.files[0])
      this.uploadProgress2 = this._task.percentageChanges();
      this._taskSubscription = this._task.snapshotChanges().pipe(
        finalize(async () => {
          const downloadURL = await this._storage.ref(path).getDownloadURL().toPromise();
          this.uploaded = true;
          this.data.insurance_card.imageURL.push({
            'name': event.target.files[0].name,
            'url': downloadURL,
            'uploaded_at': new Date().getTime()
          });
        })
      ).subscribe();
    } catch (error) {
      console.error("PROCESS UPLOAD", error);
    }
  }

}
