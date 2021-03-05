import { AddCompanyComponent } from './add-company/add-company.component';
import { CompaniesService } from './../../../shared/services/company/companies.service';
import { service } from './../../../shared/models/services';
import { ServicesService } from './../../../shared/services/services/services.service';
import { company } from './../../../shared/models/companies';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
companies:company[];

  constructor(private companyService:CompaniesService, private fb:FormBuilder) { }

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
 })

 
   
}

delete(key){
  if(!confirm('حذف الشركة؟')) return ;
  {
    this.companyService.deleteCom(key);
  }
  
}



  
}
