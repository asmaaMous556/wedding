import { department } from 'src/app/shared/models/departments';
import { DepartmentsService } from './../../../shared/services/departments/departments.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-main-departments',
  templateUrl: './main-departments.component.html',
  styleUrls: ['./main-departments.component.css']
})
export class MainDepartmentsComponent implements OnInit {
departments: department[];
filteredDepts: department[];
input=new FormControl();
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
      this.filteredDepts=this.departments;
     });

     this.input.valueChanges.pipe(debounceTime(300)).subscribe(value=>{
      if(value){
       return this.filteredDepts= this.departments.filter(dept=>{
           return (dept.titleAr.includes(value) || dept.titleEn.toLowerCase().includes(value));
              })}
         else{ return  this.filteredDepts=this.departments;}
    })

  }
  delete(key){
    if (!confirm('حذف القسم؟')) { return ; }
    {
      this.deptService.deleteDept(key);

    }
  }

}
