import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { department } from './../../models/departments';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  addDepartment(department: department){
  return   this.db.list<department>('departments/').push(department);
  }
  getDepartment(){
    return this.db.list('departments/').snapshotChanges();
  }

  updateDept(deptId: string, dept: department){
return this.db.object('/departments/' + deptId).update(dept);
  }

  deleteDept(deptId: string){
    return this.db.object('/departments/' + deptId).remove();
  }

  getDeptById(key: string){
    return this.db.object('/departments/' + key).snapshotChanges();
  }

}
