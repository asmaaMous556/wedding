import { ServicesService } from './../../../shared/services/services/services.service';
import { DepartmentsService } from './../../../shared/services/departments/departments.service';
import { service } from './../../../shared/models/services';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { department } from 'src/app/shared/models/departments';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

services: service[];


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
    });
  }



  delete(key){
    if (!confirm('حذف الخدمة؟')) { return ; }
    {
      this.service.deleteService(key);
    }


  }
}

