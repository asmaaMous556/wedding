import { ActivatedRoute } from '@angular/router';
import { item } from './../../../../shared/models/items';
import { AngularFireStorage } from '@angular/fire/storage';
import { ItemService } from './../../../../shared/services/item/item.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { company } from './../../../../shared/models/companies';
import { CompaniesService } from './../../../../shared/services/company/companies.service';
import { Component, OnInit } from '@angular/core';

import { finalize } from 'rxjs/operators';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
 
 companies:company[];
 itemForm:FormGroup;
 downloadUrl:any;
 link:string;
 isLink:boolean=false;
 itemKey:string;
 item:any;
  constructor(
     private companyService:CompaniesService,
     private fb :FormBuilder, private ItemService:ItemService, 
     private storage:AngularFireStorage, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.companyService.getCompany().subscribe(companies=>{
      this.companies=companies.map(company=>{
        return {
          key:company.key,
          titleAr:company.payload.val()['titleAr'],
          titleEn:company.payload.val()['titleEn'],
          description:company.payload.val()['description'],
          phoneNum:company.payload.val()['phoneNum'],
          address:company.payload.val()['address'],
          imageUrl:company.payload.val()['imageUrl'],
          servicesKey:company.payload.val()['servicesKey'],
   
        }
      })
      
    });
    this.itemForm=this.fb.group({
   titleAr: ['',[Validators.required]],
   titleEn:[''],
   imageUrl:[''],
   companyKey:['',[Validators.required]],
   price:['',[Validators.required]],
   info:['',[Validators.required]]
    })
   this.route.queryParams.subscribe(key=>{
    this.itemKey=key['id'];
  });
  if(this.itemKey){
    this.ItemService.getItemById(this.itemKey).subscribe(item=>{
      this.item=item.payload.val(); 
      this.itemForm.patchValue({
        titleAr:this.item.titleAr,
        titleEn:this.item.titleEn,
        info: this.item.info,
        price:this.item.price,
        companyKey:this.item.companyKey
        
      })
      if(this.item.imageUrl)
      {
       this.link=this.item.imageUrl
      
          if(this.link){
             this.isLink =true;
           }
       }
    });
  }
}

addItem(item){
  item.imageUrl=this.link;
 console.log(this.link);
  if(this.itemKey){
    this.ItemService.updateItem(item,this.itemKey);
  }
  else{
    this.ItemService.addItem(item);
  }
  this.itemForm.reset();
}


  onFileSelected(event){
    var n=Date.now();
    const file = event.target.files[0]
    const filePath = `/itemsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`/itemsImages/${n}`, file);
     task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadUrl = fileRef.getDownloadURL();
        this.downloadUrl.subscribe(url => {
          if (url) {
            this.link = url;
           console.log(this.link);
          }
        });
      })
    )
    .subscribe(url => {
      if (url) {
      }
    });
    }   
   
}
