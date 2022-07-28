import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IpService } from './ip.service';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService implements OnDestroy {

  private _itemDocs?: AngularFirestoreCollection;
  public items?: Observable<any[]>;
  public production: boolean = false;
  private _collectionName: string = environment.ORDERS;
  private _ipSubscription?: Subscription;

  public ipAddress = '';

  constructor(private _firestore: AngularFirestore, private _ipService: IpService, private _authService: AuthService) {
    this.production = environment.production;
    this.getIP();
  }

  public ngOnDestroy(): void {
    if (this._ipSubscription)
      this._ipSubscription.unsubscribe();
  }


  get(ID: string) {
    return this._firestore.doc(this._collectionName + '/' + ID)
  }

  getAll() {
    this._itemDocs = this._firestore.collection(this._collectionName);
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }


  getAllByPrac(customer_id: any) {
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where('cart.customer_id', '==', customer_id));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  getAllByUser(uid: any) {
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where('cart.uid', '==', uid));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  getAllByEmail(email: any): void {
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where('email', '==', email))
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  getInsuranceRelated(): void {
    if (!this.production)
      console.log("Getting Insurance Related Orders");
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where('charge_response', '==', 'Insurance'));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  getAllByAppointmentDate(appointmentDate: any): void {
    if (!this.production)
      console.log("Getting Orders for ", appointmentDate)
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where('appointment.date', '==', appointmentDate));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  getAllByDate(createdDate: any): void {
    if (!this.production)
      console.log("Getting Orders for ", createdDate)
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where('created_at', '==', createdDate));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  getAllByGreaterDate(queryDate: any): void {
    if (!this.production)
      console.log("Getting Orders for ", queryDate)
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where('updated_at', '>=', queryDate));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  create(data: any) {
    if (this._authService.firebaseUser)
      data.uid = this._authService.firebaseUser.uid;
    data.browser_ip = this.ipAddress;
    data.environment = environment.firebaseConfig.projectId;
    data.created_at = new Date().getTime();
    return this._firestore.collection(this._collectionName).add(data);
  }

  private getIP() {
    this._ipSubscription = this._ipService.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    })
  }

  delete(id: string) {
    this._firestore.collection(this._collectionName).doc(id).delete();
  }


}
