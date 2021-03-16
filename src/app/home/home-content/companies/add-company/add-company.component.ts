import { UploadingService } from './../../../../shared/services/uploading/uploading.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { company } from './../../../../shared/models/companies';
import { service } from './../../../../shared/models/services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CompaniesService } from 'src/app/shared/services/company/companies.service';
import { ServicesService } from 'src/app/shared/services/services/services.service';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit, OnDestroy {
 downloadUrl: any;
  services: service[];
  companyForm: FormGroup;
  compKey: string;
  company: any;
  imgLink = '';
  isImgLink = false;
  coverLink: string;
  isCoverLink:boolean=false;
  imgProgress:any;
  coverProgress:any;
  dropdownSettings: IDropdownSettings = {};
  imageUrlSub:Subscription;
  coverUrlSub:Subscription;
  constructor(private fb: FormBuilder ,
              private service: ServicesService,
              private companyService: CompaniesService,
              private storage: UploadingService,
              private route: ActivatedRoute,
              private router :Router) { }
  

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      titleAr: ['', [Validators.required]],
      titleEn: [''],
      descriptionAr: ['', [Validators.required]],
      descriptionEn: ['', [Validators.required]],
      phoneNum: ['', Validators.required],
      imageUrl: [''],
      address: ['', Validators.required],
      coverImageUrl: [''],
      services: ['', Validators.required]
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'key',
      textField: 'titleAr',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };

    this.service.getServices().subscribe(services => {
     this.services = services.map(service => {
       return{
         key: service.key,
         titleAr: service.payload.val()['titleAr'],
         titleEn: service.payload.val()['titleEn'],
         imageUrl: service.payload.val()['imageUrl'],
         departmentsKey: service.payload.val()['departmentsKey']
       };
     });
   });

    this.route.queryParams.subscribe(key => {
     this.compKey = key.id;
   });
    if (this.compKey){
     this.companyService.getCompById(this.compKey).subscribe(company => {
       this.company = company.payload.val();
       console.log(this.company);
       this.companyForm.patchValue({
         titleAr: this.company.titleAr,
         titleEn: this.company.titleEn,
         descriptionEn: this.company.descriptionEn,
         descriptionAr: this.company.descriptionAr,
         phoneNum: this.company.phoneNum,
         address: this.company.address,
         services: this.company.services,
       });
       if (this.company.imageUrl || this.company.coverImageUrl)
         {
        this.imgLink = this.company.imageUrl;
        this.coverLink=this.company.coverImageUrl
       if (this.imgLink){
           this.isImgLink = true;
             }
         }
     });
    
   }
  }

  async addCompany(company: company)
  {
   await(company.imageUrl=this.imgLink)  
    await (company.coverImageUrl=this.coverLink)
  if (this.compKey){
      this.companyService.updateCompany(this.compKey, company);
      }
      else{
        this.companyService.addCompany(company);
      }
    if(confirm('تم حفظ البيانات')){
      this.companyForm.reset();
      this.imgLink='';
      this.coverLink='';
     }
   // this.router.navigate(['/companies'])
  }

 onImageSelected(event){
  let n = Date.now();
  const file = event.target.files[0];
  const filePath = `/companiesImages/images/${n}`;
  this.storage.getProgress(filePath,file).subscribe(imgProgress=>{
  this.imgProgress=imgProgress;
  })
 this.imageUrlSub= this.storage.uploadImg(filePath, file).pipe(
  finalize(() => {
     this.storage.fileRef(filePath).getDownloadURL()
    .subscribe(url => {
      if (url) {
        this.imgLink = url;
        console.log(this.imgLink)
      }
    });
  })).subscribe(url=>{
    if(url){}
  })
}
 
 onCoverSelected(event){
  let n = Date.now();
  const file = event.target.files[0];
  const filePath = `/companiesImages/covers/${n}`;
  this.storage.getProgress(filePath,file).subscribe(coverProgress=>{
  this.coverProgress=coverProgress;
  })
 this.coverUrlSub= this.storage.uploadImg(filePath, file).pipe(
  finalize(() => {
     this.storage.fileRef(filePath).getDownloadURL()
    .subscribe(url => {
      if (url) {
        this.coverLink = url;
        console.log(this.coverLink)
      }
    });
  })).subscribe(url=>{
    if(url){}
  })
  
 }

 ngOnDestroy(): void {
   if(this.imageUrlSub && this.coverUrlSub){
    this.imageUrlSub.unsubscribe();
    this.coverUrlSub.unsubscribe();
   }
  
  
}
 
}

