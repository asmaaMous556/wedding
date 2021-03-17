import { AddCompanyComponent } from './add-company/add-company.component';
import { CompaniesService } from './../../../shared/services/company/companies.service';
import { service } from './../../../shared/models/services';
import { ServicesService } from './../../../shared/services/services/services.service';
import { company } from './../../../shared/models/companies';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
companies: company[];
input= new FormControl();
filteredCompanies: company[];
  constructor(private companyService: CompaniesService, private fb: FormBuilder) { }

  ngOnInit(): void {
 this.companyService.getCompany().subscribe(companies => {
   this.companies = companies.map(company => {
     return {
       key: company.key,
       titleAr: company.payload.val()['titleAr'],
       titleEn: company.payload.val()['titleEn'],
       descriptionAr: company.payload.val()['descriptionAr'],
       descriptionEn: company.payload.val()['descriptionEn'],
       phoneNum: company.payload.val()['phoneNum'],
       addressAr: company.payload.val()['addressAr'],
       addressEn: company.payload.val()['addressEn'],
       imageUrl: company.payload.val()['imageUrl'],
       servicesKey: company.payload.val()['servicesKey'],
       coverImageUrl: company.payload.val()['coverImageUrl']
     };
   });
   this.filteredCompanies=this.companies;
 });

 this.input.valueChanges.pipe(debounceTime(300)).subscribe(value=>{
  if(value){
   return this.filteredCompanies= this.companies.filter(company=>{
       return (company.titleAr.includes(value) || company.titleEn.toLowerCase().includes(value));
          })
     }
     else{
    return  this.filteredCompanies=this.companies;  
    }
})


}

delete(key){
  if (!confirm('حذف الشركة؟')) { return ; }
  {
    this.companyService.deleteCom(key);
  }

}




}
