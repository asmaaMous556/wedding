import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeContentComponent } from './home-content/home-content.component';
import { MainDepartmentsComponent } from './home-content/main-departments/main-departments.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { ServicesComponent } from './home-content/services/services.component';
import { CompaniesComponent } from './home-content/companies/companies.component';
import { LoginComponent } from './home-content/login/login.component';
import { HeaderComponent } from './home-layout/header/header.component';
import { AddDepartmentComponent } from "./home-content/main-departments/add-department/add-departmentComponent";
import { NzModalModule } from 'ng-zorro-antd/modal';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SideNavbarComponent } from './home-layout/side-navbar/side-navbar.component';
import { AddCompanyComponent } from './home-content/companies/add-company/add-company.component';
import { AddServiceComponent } from './home-content/services/add-service/add-service.component';
import { ItemComponent } from './home-content/item/item.component';
import { AddItemComponent } from './home-content/item/add-item/add-item.component';
import { ContactUsComponent } from './home-content/contact-us/contact-us.component';
import { AboutUsComponent } from './home-content/about-us/about-us.component';
import { ComplainsComponent } from './home-content/complains/complains.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ForgetPasswordComponent } from './home-content/forget-password/forget-password.component';
import {FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [HomeContentComponent,
     MainDepartmentsComponent,
      HomeLayoutComponent, 
      ServicesComponent,
       CompaniesComponent, 
       LoginComponent,
        HeaderComponent, 
        AddDepartmentComponent,
         SideNavbarComponent,
         AddCompanyComponent,
           AddServiceComponent,
           ItemComponent,
           AddItemComponent,
           ContactUsComponent,
           AboutUsComponent,
           ComplainsComponent,
           ForgetPasswordComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzModalModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgMultiSelectDropDownModule.forRoot()
   
  ]
})
export class HomeModule { }
