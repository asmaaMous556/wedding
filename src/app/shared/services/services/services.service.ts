import { service } from './../../models/services';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private db: AngularFireDatabase) { }

  addService(service: service){
    return this.db.list('/services').push(service);
  }
  getServices(){
    return this.db.list<service[]>('/services').snapshotChanges();
  }

  updateService(serviceId: string, service: service){
  return this.db.object('/services/' + serviceId).update(service);
  }
  deleteService(serviceId: string){
    return this.db.object('/services/' + serviceId).remove();
  }

  getServiceById(serviceId: string){
    return this.db.object('/services/' + serviceId).snapshotChanges();
  }
}
