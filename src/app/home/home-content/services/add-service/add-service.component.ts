import { UploadingService } from './../../../../shared/services/uploading/uploading.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { service } from './../../../../shared/models/services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { department } from 'src/app/shared/models/departments';
import { DepartmentsService } from 'src/app/shared/services/departments/departments.service';
import { ServicesService } from 'src/app/shared/services/services/services.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit ,OnDestroy {
  departments: department[];
  serviceForm: FormGroup;
  serviceKey: string;
  service: any;
  link: string;
  downloadUrl: any;
  isLink = false;
  progress:number;
  dropdownSettings: IDropdownSettings = {};
  imgUrlSub:Subscription;
  progressSub:Subscription
  constructor(private fb: FormBuilder,
              private deptService: DepartmentsService,
              private serviceService: ServicesService,
              private route: ActivatedRoute,
               private storage: UploadingService,
               private router:Router) { }
  

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      titleAr: ['', [Validators.required]],
      titleEn: ['', [Validators.required]],
      imageUrl: [''],
      departmentsKey: ['', [Validators.required]],
         });
    this.dropdownSettings = {
          singleSelection: false,
          idField: 'key',
          textField: 'titleAr',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          allowSearchFilter: true
        };

    this.deptService.getDepartment().subscribe(departments => {
    this.departments = departments.map(department => {
      return {
        key: department.key,
        titleAr: department.payload.val()['titleAr'],
        titleEn:department.payload.val()['titleEn'],
        imageUrl: department.payload.val()['imageUrl']
      };
    });
   });
    this.route.queryParams.subscribe(key => {
    this.serviceKey = key.id;
  });
    if (this.serviceKey){
     this.serviceService.getServiceById(this.serviceKey).subscribe(service => {
       this.service = service.payload.val();
       this.serviceForm.patchValue({
         titleAr: this.service.titleAr,
         titleEn: this.service.titleEn,
         departmentsKey: this.service.departmentsKey
       });
       if (this.service.imageUrl)
       {
       this.link = this.service.imageUrl;
       if (this.link){
              this.isLink = true;
             }
        }
     });

   }

}

 async addService(service: service){
     await (service.imageUrl = this.link);
     console.log(this.link);
     if (this.serviceKey){
      this.serviceService.updateService(this.serviceKey, service);
    }
    else{
      this.serviceService.addService(service);
    }
     if(confirm('تم حفظ البيانات')){
      this.serviceForm.reset();
     
     }
  }


  onFileSelected(event){

 let n = Date.now();
const file = event.target.files[0];
const filePath = `/servicesImages/${n}`;
this.progressSub=this.storage.getProgress(filePath,file).subscribe(progress=>{
  this.progress=progress;
});
 this.imgUrlSub=this.storage.uploadImg(filePath, file).pipe(
  finalize(() => {
     this.storage.fileRef(filePath).getDownloadURL()
    .subscribe(url => {
      if (url) {
        this.link = url;
        
      }
    });
  })).subscribe(url=>{
    if(url){}
  })

}

ngOnDestroy(): void {
  this.imgUrlSub.unsubscribe();
  this.progressSub.unsubscribe();
}

}
