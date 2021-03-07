import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
 show :boolean=false;
 visible:BehaviorSubject<boolean>;
  constructor() {
    this.visible=new BehaviorSubject(this.show);
   }
  
   nextVisible(show){
     this.visible.next(!show);
   }

}
