import { AuthGuardService } from './../shared/services/guards/auth-guard.service';
import { ComplainsComponent } from './home-content/complains/complains.component';
import { AboutUsComponent } from './home-content/about-us/about-us.component';
import { ContactUsComponent } from './home-content/contact-us/contact-us.component';
import { AddItemComponent } from './home-content/item/add-item/add-item.component';
import { ItemComponent } from './home-content/item/item.component';
import { AddCompanyComponent } from './home-content/companies/add-company/add-company.component';
import { AddServiceComponent } from './home-content/services/add-service/add-service.component';
import { MainDepartmentsComponent } from './home-content/main-departments/main-departments.component';
import { LoginComponent } from './home-content/login/login.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { CompaniesComponent } from './home-content/companies/companies.component';
import { ServicesComponent } from './home-content/services/services.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, ChildrenOutletContexts } from '@angular/router';
import { AddDepartmentComponent } from "./home-content/main-departments/add-department/add-departmentComponent";


const routes: Routes = [
  {path:'',component:HomeLayoutComponent,
 children : [
    {path:'',component:HomeContentComponent},
    {path:'departments',component:MainDepartmentsComponent,canActivate:[AuthGuardService]},
    {path:'add-dept',component:AddDepartmentComponent,canActivate:[AuthGuardService]},
    {path:'login',component:LoginComponent},
    { path:'services', component:ServicesComponent,canActivate:[AuthGuardService]},
    {path:'add-service',component:AddServiceComponent,canActivate:[AuthGuardService]},
    {path:'companies',component:CompaniesComponent,canActivate:[AuthGuardService]},
    {path:'add-company',component:AddCompanyComponent,canActivate:[AuthGuardService]},
    {path:'items', component:ItemComponent,canActivate:[AuthGuardService]},
    {path:'add-item',component:AddItemComponent,canActivate:[AuthGuardService]},
    {path:'contactUs',component:ContactUsComponent,canActivate:[AuthGuardService]},
    {path:'aboutUs',component:AboutUsComponent,canActivate:[AuthGuardService]},
    {path:'complains',component:ComplainsComponent,canActivate:[AuthGuardService]}
    
  ]
 
  
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
