import { ServicesService } from './../../../shared/services/services/services.service';
import { DepartmentsService } from './../../../shared/services/departments/departments.service';
import { service } from './../../../shared/models/services';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { department } from 'src/app/shared/models/departments';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, AfterViewInit {

services: service[];
filteredServices:service[];
serviceKey:string
input=new FormControl();


  constructor(private service: ServicesService) { }
  
  ngOnInit(): void {
    this.service.getServices().subscribe(services => {
      this.services = services.map(service => {
        return{
          key: service.key,
          titleAr: service.payload.val()['titleAr'],
          titleEn: service.payload.val()['titleEn'],
          imageUrl: service.payload.val()['imageUrl'],
          departmentsKey: service.payload.val()[' departmentTitleAr'],

        };
       
      });
      this.filteredServices=this.services;
    });
    this.input.valueChanges.pipe(debounceTime(300)).subscribe(value=>{
      
      console.log(value);
      if(value){
       return this.filteredServices= this.services.filter(service=>{
           return (service.titleAr.includes(value) || service.titleEn.toLowerCase().includes(value));
              })
         }
         else{
        return  this.filteredServices=this.services;
         
        }
    })
  }

  ngAfterViewInit(): void {
   
  }



  delete(key){
    if (!confirm('حذف الخدمة؟')) { return ; }
    {
      this.service.deleteService(key);
    }
  }
  

}

