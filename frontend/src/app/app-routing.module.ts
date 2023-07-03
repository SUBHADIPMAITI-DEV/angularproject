import { ShowEmployeeComponent } from './show-employee/show-employee.component';
import { AuthGuard } from './share/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'employee',
    // canActivate: [AuthGuard],
    component:EmployeeComponent,
    
  },
  {
    path:'show',
    component:ShowEmployeeComponent,
  },
  {
    path:'**',
    component:ShowEmployeeComponent
  },
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

