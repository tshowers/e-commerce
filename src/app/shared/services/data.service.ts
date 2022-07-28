import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IpService } from './ip.service';
import { Subscription } from 'rxjs';
import { environment } from "../../../environments/environment";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {

  private _itemDocs?: AngularFirestoreCollection;
  public items?: Observable<any[]>;

  private _itemDoc?: AngularFirestoreDocument<any>;
  public item?: Observable<any>;
  public production: boolean;

  private _ipSubscription?: Subscription;

  public ipAddress = '';

  constructor(private _firestore: AngularFirestore, private _ipService: IpService, private _authService: AuthService) {
    this.production = environment.production;
    this.getIP();
  }

  public ngOnDestroy() : void {
    if (this._ipSubscription)
      this._ipSubscription.unsubscribe();
  }

  getAll(collectionName: string) {
    this._itemDocs = this._firestore.collection(collectionName);
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  getAllByEmail(collectionName: string, email: string) {
    this._itemDocs = this._firestore.collection(collectionName, ref => ref.where("email", "==", email));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  delete(collectionName: string, id: string) {
    this._firestore.collection(collectionName).doc(id).delete();

  }

  updateByUID(collectionName: string, data: any) {
    data.updated_at = new Date().getTime();
    data.browser_ip = this.ipAddress;
    if (this._authService.firebaseUser) {
      data.uid = this._authService.firebaseUser?.uid;
      this._firestore.collection(collectionName).doc(data.uid).set(data,{merge: true});
    }
  }

  update(collectionName: string, id: string, data: any) {
    data.updated_at = new Date().getTime();
    if (this._authService.firebaseUser)
      data.uid = this._authService.firebaseUser.uid;
    // data.updated_by = (this._usersService.user && this._usersService.user.email) ? this._usersService.user.email : '';
    data.browser_ip = this.ipAddress;

    this._firestore.collection(collectionName).doc(id).set(data, { merge: true });
  }

  add(collectionName: string, data: any) {
    data.updated_at = new Date().getTime();
    data.created_at = new Date().getTime();
    // data.updated_by = (this._usersService.user && this._usersService.user.email) ? this._usersService.user.email : '';
    data.browser_ip = this.ipAddress;
    if (this._authService.firebaseUser)
      data.uid = this._authService.firebaseUser.uid;

    return this._firestore.collection(collectionName).add(data);
  }

  addRecordReturnKey(collectionName: string, data: any) {
    data.updated_at = new Date().getTime();
    data.created_at = new Date().getTime();
    // data.updated_by = (this._usersService.user && this._usersService.user.email) ? this._usersService.user.email : '';
    data.browser_ip = this.ipAddress;
    if (this._authService.firebaseUser)
      data.uid = this._authService.firebaseUser.uid;

    const id = this._firestore.createId();    
    this._firestore.collection(collectionName).doc(id).set(data);
    return id;
  }

  get(collectionName: string, id: string) {
    this._itemDoc = this._firestore.doc<any>(collectionName + '/' + id);
    this.item = this._itemDoc.valueChanges({ idField: '_id' });
  }

  getByTitle(collectionName: string, title: string) {
    return this._firestore.collection(collectionName, ref => ref.where('title', '==', title)).get();
  }

  getByLastUpdated(collectionName: string) {
    this._itemDocs = this._firestore.collection(collectionName, ref => ref.orderBy('updated_at', "desc"));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  getAllByNotThis(collectionName: string, fieldName: string, notThisValue: string) {
    this._itemDocs = this._firestore.collection(collectionName, ref => ref.where(fieldName, "!=", notThisValue));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  searchCurrentByStatus(status: any) {
    this.items = this._itemDocs?.valueChanges({ idField: '_id' }).pipe(
      map(items => {
        return items.filter(item => { return (item.status == status) || (item.status == Number(status)) })
      })
    );
  }

  private getIP() {
    this._ipSubscription = this._ipService.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    })
  }


}
