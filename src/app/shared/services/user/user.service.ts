import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private db:AngularFireDatabase) { 
    
  }
  
  save (user:firebase.default.User){
 return this.db.object('/users/'+user.uid).set({
   id:user.uid,
   email:user.email,
 })

}
 getUser(userId:string){
  return this.db.object('users/'+userId).valueChanges();
}
}
