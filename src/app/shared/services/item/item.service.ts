import { item } from './../../models/items';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private db : AngularFireDatabase) { }

  addItem(item:item){
    return this.db.list('/items/').push(item);
  }

  getItems(){
    return this.db.list('/items/').snapshotChanges();
  }

  getItemById(key:string){
    return this.db.object('/items/'+key).snapshotChanges();
  }

  deleteItem(key){
    return this.db.object('/items/'+key).remove;
  }

  updateItem(item:item,key:string){
    return this.db.object('/items/'+ key).update(item)
  }
}
