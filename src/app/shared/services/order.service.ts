import { Injectable, OnInit } from '@angular/core';
import { GeneralDataService } from './general-data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends GeneralDataService  {

  private _collectionName = environment.ORDERS;

  getData(ID: string) {
    super.get(ID, this._collectionName);
  }

  getAll() {
    super.getAll(this._collectionName);
  }

  createData(data: any) {
    super.create(data, this._collectionName);
  }

  delete(id:string) {
    super.delete(id, this._collectionName);
  }

  getAllByPrac(customerId: any) {
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where('cart.customerId', '==', customerId).where("companyId", "==", this._settingService.settings._id));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  getAllByUser(uid: any) {
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where('cart.uid', '==', uid).where("companyId", "==", this._settingService.settings._id));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  getAllByEmail(email: any): void {
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where('email', '==', email).where("companyId", "==", this._settingService.settings._id))
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  getInsuranceRelated(): void {
    if (!environment.production)
      console.log("Getting Insurance Related Orders");
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where('chargeResponse', '==', 'Insurance').where("companyId", "==", this._settingService.settings._id));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  getAllByAppointmentDate(appointmentDate: any): void {
    if (!environment.production)
      console.log("Getting Orders for ", appointmentDate)
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where('appointment.date', '==', appointmentDate).where("companyId", "==", this._settingService.settings._id));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  getAllByDate(createdDate: any): void {
    if (!environment.production)
      console.log("Getting Orders for ", createdDate)
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where('createdAt', '==', createdDate).where("companyId", "==", this._settingService.settings._id));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  getAllByGreaterDate(queryDate: any): void {
    if (!environment.production)
      console.log("Getting Orders for ", queryDate)
    this._itemDocs = this._firestore.collection(this._collectionName, ref => ref.where('lastUpdated', '>=', queryDate).where("companyId", "==", this._settingService.settings._id));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }


}
