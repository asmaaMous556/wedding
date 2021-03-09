import { company } from './../../models/companies';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private db: AngularFireDatabase) { }

  addCompany(company: company){
 return this.db.list('/companies/').push(company);
  }

  getCompany(){
    return this.db.list('/companies/').snapshotChanges();
  }

  updateCompany(compId: string, company: company){
    return this.db.object('/companies/' + compId).update(company);
  }

  deleteCom(compId: string){
    return this.db.object('/companies/' + compId).remove();
  }
  getCompById(id: string){
 return this.db.object('/companies/' + id).snapshotChanges();
  }
}
