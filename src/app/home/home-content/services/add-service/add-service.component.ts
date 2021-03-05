import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { service } from './../../../../shared/models/services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { department } from 'src/app/shared/models/departments';
import { DepartmentsService } from 'src/app/shared/services/departments/departments.service';
import { ServicesService } from 'src/app/shared/services/services/services.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  departments: department[];
  serviceForm: FormGroup;
  serviceKey:string;
  service:any;
  link:string;
  downloadUrl:any;
  isLink:boolean=false;
  constructor(private fb:FormBuilder,
    private deptService:DepartmentsService,
    private serviceService:ServicesService,
    private route:ActivatedRoute, private storage :AngularFireStorage
    ) { }

  ngOnInit(): void {
    this.serviceForm=this.fb.group({
      titleAr:['',[Validators.required]],
      titleEn:[''],
      imageUrl:['',[Validators.required]],
      departmentsKey:['',[Validators.required]],
         })

   this.deptService.getDepartment().subscribe(departments=>{
    this.departments=departments.map(department=>{
      return {
        key:department.key,
        titleAr:department.payload.val()['titleAr'],
        imageUrl:department.payload.val()['imageUrl']
      }
    })
   });
   this.route.queryParams.subscribe(key=>{
    this.serviceKey=key['id'];
    console.log(this.serviceKey)
  });
   if(this.serviceKey){
     this.serviceService.getServiceById(this.serviceKey).subscribe(service=>{
       this.service=service.payload.val()
       this.serviceForm.patchValue({
         titleAr: this.service.titleAr,
         titleEn:this.service.titleEn,
         departmentsKey:this.service.departmentsKey
       })
       if(this.service.imageUrl)
       {
       this.link=this.service.imageUrl
        console.log(this.link);
           if(this.link){
              this.isLink =true;
             }
        }
     })
   
   }
  
}
  
  addService(service:service){
    service.imageUrl=this.link;
    console.log(this.link)
    if(this.serviceKey){
      this.serviceService.updateService(this.serviceKey,service)
    }
    else{
      this.serviceService.addService(service);
    }
   
  }


  onFileSelected(event){
    var  date= Date.now()
     const file = event.target.files[0];
     const filePath = `/serviceImages/${date}`;
     const fileRef = this.storage.ref(filePath);
     const task = this.storage.upload(`/serviceImages/${date}`, file);
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

previewImg(){
  location.href=this.link;
}
deleteImg(){

}


}