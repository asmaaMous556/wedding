import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadingService {

  constructor(private storage: AngularFireStorage) { }

  uploadImg(path:string,file:any){
 return this.storage.upload(path, file).snapshotChanges();
  }

  fileRef(path: string){
    return this.storage.ref(path);
  }

  getProgress(path:string,file:any){
    return this.storage.upload(path, file).percentageChanges();
  }
}
