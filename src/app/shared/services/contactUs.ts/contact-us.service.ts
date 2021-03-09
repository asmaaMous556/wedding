import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { contactUs } from '../../models/contactUs';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private db: AngularFireDatabase) { }

  getContactUsForm(): Observable<contactUs>{
    return this.db.object<contactUs>('contactUs').valueChanges();

  }

  setContactUsForm(contactUsForm){
    return this.db.object('contactUs/').set(contactUsForm);
  }
}
