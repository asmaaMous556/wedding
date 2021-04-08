import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
 show :boolean=false;
 visible:BehaviorSubject<boolean>;
  constructor(private db : AngularFireDatabase) {
    this.visible=new BehaviorSubject(this.show);
   }
  
   nextVisible(show){
     this.visible.next(!show);
   }

   setShow(isHidden:boolean){
     return this.db.object('/isHidden/').set({
       isHidden: isHidden
     })
   }

}
