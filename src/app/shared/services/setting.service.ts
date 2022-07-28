import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
import { IpService } from './ip.service';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class SettingService implements OnDestroy {

  private _itemDocs?: AngularFirestoreCollection;
  public items?: Observable<any[]>;
  public production: boolean;
  private _collectionName: string = environment.SETTINGS;

  private _ipSubscription?: Subscription;

  public ipAddress = '';

  public settings: any;

  constructor(private _firestore: AngularFirestore, private _ipService: IpService, private _authService: AuthService) {
    this.production = environment.production;
    this.getIP();
  }

  public ngOnDestroy() : void {
    if (this._ipSubscription)
      this._ipSubscription.unsubscribe();
  }


  get(ID: string) {
    return this._firestore.doc(this._collectionName + '/' + ID)
  }

  getAll() {
    if(!this.production)
      console.info("getAll", this._collectionName);
    this._itemDocs = this._firestore.collection(this._collectionName);
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  update(data: any, id:string) {
    data.updated_at = new Date().getTime();
    if (this._authService.firebaseUser)
      data.uid = this._authService.firebaseUser.uid;
    // data.updated_by = (this._usersService.user && this._usersService.user.email) ? this._usersService.user.email : '';
    data.browser_ip = this.ipAddress;

    this._firestore.collection(this._collectionName).doc(id).set(data, { merge: true });

  }

  create(data: any) {
    if (this._authService.firebaseUser)
      data.uid = this._authService.firebaseUser.uid;
    data.browser_ip = this.ipAddress;
    data.created_at = new Date().getTime();
    return this._firestore.collection(this._collectionName).add(data);
  }

  private getIP() {
    this._ipSubscription = this._ipService.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    })
  }

}
