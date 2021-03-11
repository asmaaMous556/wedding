import { UploadingService } from '../../../../shared/services/uploading/uploading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentsService } from '../../../../shared/services/departments/departments.service';
import { department } from '../../../../shared/models/departments';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit, OnDestroy {
  modalRef: any;
  deptForm: FormGroup;
  downloadUrl: any;
  url: any;
  link: string;
  deptId: string;
  dept: any;
  isLink: boolean = false;
  progress: number;
  imgUrlSub: Subscription;
  progressSub:Subscription;
  constructor(private fb: FormBuilder,
    private deptService: DepartmentsService,
    private storage: UploadingService,
    private route: ActivatedRoute,
    private router: Router) { }
  

  ngOnInit(): void {
    this.deptForm = this.fb.group({
      titleAr: ['', [Validators.required]],
      titleEn: ['', []],
      imageUrl: ['', [Validators.required]],
    });
    this.route.queryParams.subscribe(key => {
      this.deptId = key.id;
    });
    if (this.deptId) {
      this.deptService.getDeptById(this.deptId).subscribe(dept => {
        this.dept = dept.payload.val();
        this.deptForm.patchValue({
          titleAr: this.dept.titleAr,
          titleEn: this.dept.titleEn,
        });
        if (this.dept.imageUrl) {
          this.link = this.dept.imageUrl;
          if (this.link) {
            this.isLink = true;
          }
        }
      });

    }

  }


  async addDepartment(department: department) {
    await (department.imageUrl = this.link);
    if (this.deptId) {
      this.deptService.updateDept(this.deptId, department);
    }
    else {
      this.deptService.addDepartment(department);
    }
    if (confirm('تم حفظ البيانات')) {
      this.deptForm.reset();
      // this.router.navigate['/departments'];
    }

  }

  onFileSelected(event) {
    let n = Date.now();
    const file = event.target.files[0];
    const filePath = `/deptsImages/${n}`;
   this.progressSub= this.storage.getProgress(filePath, file).subscribe(progress => {
      this.progress = progress;
    });
   this.imgUrlSub= this.storage.uploadImg(filePath, file).pipe(
      finalize(() => {
        this.storage.fileRef(filePath).getDownloadURL()
          .subscribe(url => {
            if (url) {
              this.link = url;
              console.log(this.link);
            }
          });
      })).subscribe(url => {
        if (url) { }
      });
  }

  ngOnDestroy(): void {
     this.imgUrlSub.unsubscribe();
     this.progressSub.unsubscribe();
  }

}
