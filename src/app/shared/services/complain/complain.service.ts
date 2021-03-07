import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompalinService {

  constructor( private db:AngularFireDatabase) { }

  
  getAllComplains(){
    return this.db.list('/complains/').snapshotChanges();
  }



}
