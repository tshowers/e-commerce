import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { environment } from "../../../environments/environment";
import { IpService } from './ip.service';
import { Subscription } from 'rxjs';
import { User } from '../data/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {

  private _itemDocs?: AngularFirestoreCollection;
  public items?: Observable<any[]>;

  private _refDocs?: AngularFirestoreCollection;
  public refDocs?: Observable<any[]>;

  public production: boolean;
  private _collectionName: string = environment.USERS;
  private _ipSubscription?: Subscription;

  public userSubject = new Subject<User>();
  public company: any;
  public user?: User;
  public ipAddress = '';
  public lastOrderID: any;
  public file?: string;
  public admin$ = new BehaviorSubject<Boolean>(false);
  public insurancePartner$ = new BehaviorSubject<Boolean>(false);
  public practitioner$ = new BehaviorSubject<Boolean>(false);
  public isPracFound: boolean = false;

  constructor(private _firestore: AngularFirestore, private _ipService: IpService, public authService: AuthService) {
    this.production = environment.production;
    this.getIP();
    this.setUser();
  }


  ngOnDestroy(): void {
    if (this._ipSubscription)
      this._ipSubscription.unsubscribe();
  }

  public set(user: any) {
    this.user = user;
    this.setRoles();
    this.userSubject.next(this.user);
  }

  public setRoles(): void {
    this.setAdmin();
    this.setPartner();
    this.setPractitioner();
  }

  private setUser(): void {
    this.authService.loggedInUser.subscribe((firebaseUser) => {

      if (!this.production)
        console.log("loggedInUser Fired", firebaseUser);

      if (firebaseUser) {
        this.getUser()?.valueChanges({ idField: '_id' }).subscribe((u) => {
          this.user = u;
          this.setAdmin();
          this.setPartner();
          this.setPractitioner();
          this.userSubject.next(u);
        });
      }
      else {
        this.user = undefined;

        if (!this.production)
          console.log("User Reset", this.user);
      };
    })
  }

  getNewUser(uid: any, emailAdderess: string): User {
    return this.user = <User>{
      roles: ['reader'],
      email: emailAdderess,
      uid: uid
    }
  }

  update(): void {
    if (this.user) {
      this.user.updated_at = new Date().getTime();
      this.user.browser_ip = this.ipAddress;
      this._firestore.collection(this._collectionName).doc(this.user._id).set(this.user, { merge: true });
    }
  }

  findUserCompany(customer_id: any): void {
    this._refDocs = this._firestore.collection(this._collectionName, ref => ref.where("customer_id", "==", customer_id));
    this.refDocs = this._refDocs.valueChanges({ idField: '_id' });
  }

  private setAdmin() {
    if (!this.production)
      console.log("Admin set");

    this.admin$.next((this.authService.firebaseUser && this.user && this.user.roles && this.user.roles.length) ? this.user.roles.includes('admin') : false);
  }

  private setPartner() {
    if (!this.production)
      console.log("Partner set");

    this.insurancePartner$.next((this.authService.firebaseUser && this.user && this.user.roles && this.user.roles.length) ? this.user.roles.includes('partner') : false);
  }

  private setPractitioner() {
    if (!this.production)
      console.log("Practioner set");
      
    this.practitioner$.next((this.authService.firebaseUser && this.user && this.user.user_type) ? (this.user.user_type === 'practitioner') : false);
  }

  get(ID: string) {
    return this._firestore.doc(this._collectionName + '/' + ID);
  }

  getUser() {
    return (this.authService.firebaseUser) ? this._firestore.doc(this._collectionName + '/' + this.authService.firebaseUser.uid) : null;
  }

  getAll() {
    this._itemDocs = this._firestore.collection(this._collectionName);
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }


  create(data: any) {
    data.browser_ip = this.ipAddress;
    data.created_at = new Date().getTime();
    if (this.authService.firebaseUser) {
      data.uid = this.authService.firebaseUser.uid;
      this._firestore.collection(this._collectionName).doc(data.uid).set(data, { merge: true });
    }
  }

  getAllByUserType(userType: string) {
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where("user_type", "==", userType));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }


  private getIP() {
    this._ipSubscription = this._ipService.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    })
  }

}
