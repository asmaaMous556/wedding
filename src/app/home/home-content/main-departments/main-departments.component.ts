import { department } from 'src/app/shared/models/departments';
import { DepartmentsService } from './../../../shared/services/departments/departments.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-departments',
  templateUrl: './main-departments.component.html',
  styleUrls: ['./main-departments.component.css']
})
export class MainDepartmentsComponent implements OnInit {
departments: department[];

  constructor(private deptService: DepartmentsService) { }
  ngOnInit(): void {
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

  }
  delete(key){
    if (!confirm('حذف القسم؟')) { return ; }
    {
      this.deptService.deleteDept(key);

    }
  }

}
