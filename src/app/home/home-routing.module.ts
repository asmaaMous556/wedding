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
import { AddDepartmentComponent } from './home-content/main-departments/add-department/add-department.component';


const routes: Routes = [
  {path:'',component:HomeLayoutComponent,
 children : [
    {path:'',component:HomeContentComponent},
    {path:'departments',component:MainDepartmentsComponent},
    {path:'add-dept',component:AddDepartmentComponent},
    {path:'login',component:LoginComponent},
    { path:'services', component:ServicesComponent},
    {path:'add-service',component:AddServiceComponent},
    {path:'companies',component:CompaniesComponent},
    {path:'add-company',component:AddCompanyComponent},
    {path:'items', component:ItemComponent},
    {path:'add-item',component:AddItemComponent}
    
  ]
 
  
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
