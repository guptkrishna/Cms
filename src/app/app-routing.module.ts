import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/Home/home/home.component';
import { CompanyListComponent } from './components/company-list/company-list/company-list.component';
import { BuildingListComponent } from './components/building-list/building-list/building-list.component';
import { AssetsListComponent } from './components/assets-list/assets-list/assets-list.component';
import { ComplexListComponent } from './components/complex-list/complex-list/complex-list.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { LoginPageComponent } from './components/Login/login-page/login-page.component';
import { SignupPageComponent } from './components/signup/signup-page/signup-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuard } from './services/auth.guard';  

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'navbar',component:NavbarComponent},
  {path:'home',component: HomeComponent},
  {path:'employee',component: EmployeeListComponent, canActivate: [AuthGuard]},
  {path:'assets',component: AssetsListComponent, canActivate: [AuthGuard]},
  {path:'complex',component:ComplexListComponent, canActivate: [AuthGuard]},
  {path:'company',component: CompanyListComponent, canActivate: [AuthGuard]},
  {path:'building',component: BuildingListComponent, canActivate: [AuthGuard]},
  { path:'login',   component: LoginPageComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [HomeComponent,EmployeeListComponent,AssetsListComponent,ComplexListComponent,CompanyListComponent,
  BuildingListComponent]
