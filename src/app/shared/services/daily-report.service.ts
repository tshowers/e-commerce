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
export class DailyReportService implements OnDestroy {

  private _itemDocs?: AngularFirestoreCollection;
  public items?: Observable<any[]>;
  public production: boolean = false;
  private _collectionName: string = environment.DAILY_REPORTS;
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
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.orderBy('created_at','desc'));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }


  private getIP() {
    this._ipSubscription = this._ipService.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    })
  }

}
