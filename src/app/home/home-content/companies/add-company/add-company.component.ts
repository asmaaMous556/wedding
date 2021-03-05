import { AngularFireStorage } from '@angular/fire/storage';
import { company } from './../../../../shared/models/companies';
import { service } from './../../../../shared/models/services';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CompaniesService } from 'src/app/shared/services/company/companies.service';
import { ServicesService } from 'src/app/shared/services/services/services.service';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

 downloadUrl:any;
  services:service[]
  companyForm: FormGroup;
  compKey: string;
  company:any;
  link:string='';
  isLink:boolean=false;
  constructor(private fb:FormBuilder ,
    private service:ServicesService,
    private companyService:CompaniesService,
    private storage :AngularFireStorage,
    private route :ActivatedRoute) { }

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      titleAr:['',[Validators.required]], 
      titleEn:[''], 
      description:['',[Validators.required]],
      phoneNum:['',Validators.required],
      imageUrl:['',Validators.required],
      address:['',Validators.required],
      coverImageUrl:[''],
      services: ['',Validators.required]
    })

   this.service.getServices().subscribe(services=>{
     this.services=services.map(service=>{
       return{
         key:service.key,
         titleAr:service.payload.val()['titleAr'],
         titleEn:service.payload.val()['titleEn'],
         imageUrl:service.payload.val()['imageUrl'],
         departmentsKey:service.payload.val()['departmentsKey'],
       }
     })
   })

   this.route.queryParams.subscribe(key=>{
     this.compKey=key['id'];
   });
   if(this.compKey){
     this.companyService.getCompById(this.compKey).subscribe(company=>{
       this.company=company.payload.val(); 
       console.log(this.company);
       this.companyForm.patchValue({
         titleAr:this.company.titleAr,
         titleEn:this.company.titleEn,
         description: this.company.description,
         phoneNum:this.company.phoneNum,
         address:this.company.address,
         services:this.company.services
       })
    if(this.company.imageUrl)
    {
     this.link=this.company.imageUrl
     console.log(this.link);
        if(this.link){
           this.isLink =true;
             }
     }
     });
     
   }
  }

  addCompany(company:company)
  {
    
  company.imageUrl=this.link;
    if(this.compKey){
      this.companyService.updateCompany(this.compKey,company)
      }
      else{
        this.companyService.addCompany(company);
      }   
      this.companyForm.reset();
  }

 onFileSelected(event){
   var n=Date.now();
  const file = event.target.files[0]
  const filePath = `/companiesImages/${n}`;
  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(`/companiesImages/${n}`, file);
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
deleteImg(){
 
}

}