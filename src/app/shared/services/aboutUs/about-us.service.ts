import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {
show = false;
  constructor(private db: AngularFireDatabase) { }


  getText(){
    return this.db.object('/aboutUs/').valueChanges();

  }

  setText(text: string){
    return this.db.object<string>('/aboutUs/').set(text);
  }

}
