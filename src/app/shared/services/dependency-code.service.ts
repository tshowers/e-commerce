import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DependencyCodeService {

  private _itemDocs?: AngularFirestoreCollection;
  public items?: Observable<any[]>;
  private _collectionName: string = environment.PRODUCT_DEPENDENCIES;


  constructor(private _firestore: AngularFirestore) { }

  getAll() {
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.orderBy('name'));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  delete(id: string) {
    this._firestore.collection(this._collectionName).doc(id).delete();
  }
}
