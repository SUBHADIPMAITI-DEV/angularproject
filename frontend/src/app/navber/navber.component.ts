import { Router } from '@angular/router';
import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { EmployeeService } from '../employee.service';
@Component({
  selector: 'app-navber',
  templateUrl: './navber.component.html',
  styleUrls: ['./navber.component.css']
})
export class NavberComponent {

  constructor(
    private router:Router,
    private emp:EmployeeService
    ){

  }

  isToken:boolean=false;
  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.isToken=true;
    }else{
      this.isToken=false;
    }

    console.log(this.isToken)
    
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    window.location.reload();
  }

  searchEmp(e:any){
// console.log(e.target.value)
this.emp.setFilter(e.target.value);
  }

  

}
