import { UploadingService } from './../../../../shared/services/uploading/uploading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from './../../../../shared/services/item/item.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { company } from './../../../../shared/models/companies';
import { CompaniesService } from './../../../../shared/services/company/companies.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit ,OnDestroy{

 companies: company[];
 itemForm: FormGroup;
 downloadUrl: any;
 link: string='';
 isLink :boolean= false;
 itemKey: string;
 item: any;
 loading:boolean=false;
 progress:any;
 imgUrlSub:Subscription;
 progressSub:Subscription
  constructor(
     private companyService: CompaniesService,
     private fb: FormBuilder, private ItemService: ItemService,
     private storage: UploadingService, private route: ActivatedRoute) { }
  

  ngOnInit(): void {
    this.companyService.getCompany().subscribe(companies => {
      this.companies = companies.map(company => {
        return {
          key: company.key,
          titleAr: company.payload.val()['titleAr'],
          titleEn: company.payload.val()['titleEn'],
          descriptionAr: company.payload.val()['descriptionAr'],
          descriptionEn: company.payload.val()['descriptionEn'],
          phoneNum: company.payload.val()['descriptionEn'],
          addressAr: company.payload.val()['addressAr'],
          addressEn: company.payload.val()['addressEn'],
          imageUrl: company.payload.val()['imageUrl'],
          servicesKey: company.payload.val()['servicesKey'],

        };
      });

    });
    this.itemForm = this.fb.group({
   titleAr: ['', [Validators.required]],
   titleEn: [''],
   imageUrl: [''],
   companyKey: ['', [Validators.required]],
   price: ['', [Validators.required]],
   infoAr: ['', [Validators.required]],
   infoEn: ['', [Validators.required]]
    });
    this.route.queryParams.subscribe(key => {
    this.itemKey = key.id;
  });
    if (this.itemKey){
    this.ItemService.getItemById(this.itemKey).subscribe(item => {
      this.item = item.payload.val();
      this.itemForm.patchValue({
        titleAr: this.item.titleAr,
        titleEn: this.item.titleEn,
        infoAr: this.item.infoAr,
        infoEn: this.item.infoEn,
        price: this.item.price,
        companyKey: this.item.companyKey

      });
      if (this.item.imageUrl)
      {
       this.link = this.item.imageUrl;

       if (this.link){
             this.isLink = true;
           }
       }
    });
  }
}

 async addItem(item){
 await(item.imageUrl=this.link);
  if (this.itemKey){
    this.ItemService.updateItem(item, this.itemKey);
  }
  else{
    console.log(item);
    this.ItemService.addItem(item);
  }
  confirm('تم حفظ البيانات');
  this.itemForm.reset();
  this.link='';

}


  onFileSelected(event){
    this.loading=!this.loading;
    let n = Date.now();
const file = event.target.files[0];
const filePath = `/itemsImages/${n}`;
this.progressSub=this.storage.getProgress(filePath,file).subscribe(progress=>{
  this.progress=progress;
})
this.imgUrlSub= this.storage.uploadImg(filePath, file).pipe(
  finalize(() => {
   this.storage.fileRef(filePath).getDownloadURL()
    .subscribe(url => {
      if (url) {
        this.link = url;
        console.log(this.link)
      }
    });
  })).subscribe(url=>{
    if(url){}
  })
}
ngOnDestroy(): void {
  if(this.imgUrlSub && this.progressSub){
    this.imgUrlSub.unsubscribe();
    this.progressSub.unsubscribe();
  }
  

}

}

