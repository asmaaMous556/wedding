import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { DepartmentsService } from './../../../../shared/services/departments/departments.service';
import { department } from './../../../../shared/models/departments';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
modalRef:any;
deptForm: FormGroup;
downloadUrl: any;
url: any;
link: string;
deptId:string;
dept:any;
isLink:boolean=false;

  constructor(private fb:FormBuilder,
      private deptService:DepartmentsService,
      private storage :AngularFireStorage,
      private route :ActivatedRoute) { }

  ngOnInit(): void {
    this.deptForm = this.fb.group({
      titleAr :['',[Validators.required]],
      titleEn :['',[]],
      imageUrl:['',[Validators.required]],
      
       });
       this.route.queryParams.subscribe(key=>{
        this.deptId=key['id'];   
      });
      if(this.deptId){
        this.deptService.getDeptById(this.deptId).subscribe(dept=>{
          this.dept=dept.payload.val();
          this.deptForm.patchValue({
            titleAr:this.dept.titleAr,
            titleEn:this.dept.titleEn,
           // imageUrl:this.dept.imageUrl
          })
          if(this.dept.imageUrl)
          {
           this.link=this.dept.imageUrl
              if(this.link){
                 this.isLink =true;
               }
           }
        })
       
      }
 
  }

 
  addDepartment(department:department){
    department.imageUrl=this.link
    if(this.deptId){
      this.deptService.updateDept(this.deptId,department);
    }
    else{
      this.deptService.addDepartment(department);
    }
    this.deptForm.reset();
    
  }

  onFileSelected(event){
    var  date= Date.now()
     const file = event.target.files[0];
     const filePath = `/deptsImages/${date}`;
     const fileRef = this.storage.ref(filePath);
     const task = this.storage.upload(`/deptsImages/${date}`, file);
      task.snapshotChanges().pipe(
       finalize(() => {
         this.downloadUrl = fileRef.getDownloadURL();
         this.downloadUrl.subscribe(url => {
           if (url) {
             this.link = url;
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
