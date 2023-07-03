import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  
  constructor(
    public _employeeService: EmployeeService,
    private _fb: FormBuilder,
    private router:Router

  ) {
    
  }

  p: number = 1;
  collection: any[] = [];
  btnAction: string = '';
  isLoading = true;
  isSubmit = false;
  isUpdate = false;
  alert = {
    error: '',
    success: '',
  };

  employeeForm = this._fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    position: ['', Validators.required],
    about: ['', Validators.required],
    joining_data: ['', Validators.required],

  }); 
  empArray: any[] | object[] = [];
  categoryData = {};
  employeeId: number = 0;
  onSubmit() {
    if(!this.employeeForm.valid)
    {
        console.log(this.employeeForm);
        
    }else{
        this.isSubmit = true;
    if (this.btnAction === 'Update')
      this.updateEmployee(this.employeeId, this.employeeForm.value);
    else this.createEmployee(this.employeeForm.value);
    }
    
  }




  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.isLoading = true;
    this._employeeService.read().subscribe(
      (res) => {
        this.isLoading = false;
        this.empArray = res;
        if(localStorage.getItem('login')=='true'){
          localStorage.setItem('login','false');
        }else{
          localStorage.setItem('login','true');
          window.location.reload();
        }
        // console.log(res[0],"hello");
      },
      (err) => {
        this.isLoading = false;
        console.log(err.status);
      }
    );
  }

  getEmployee(id: number, action: string) {
    this.btnAction = action;
    this._employeeService.find(id).subscribe(
      (res) => {
        let date=moment(new Date(res.joining_data)).format("YYYY-MM-DD");
        console.log(date);
        
        this.employeeId = id;
        this.employeeForm = new FormGroup({
          name: new FormControl(res.name),
          email: new FormControl(res.email),
          position: new FormControl(res.position),
          about: new FormControl(res.about),
          joining_data: new FormControl(date),

        });
        console.log(res);
      },
      (err) => {
        if (err.status == 401) {
          console.log(err.status);
        } else {
          this.isLoading = false;
          console.log(err.status);
        }
      }
    );
  }


  createEmployee(data: any) {
    let token =localStorage.getItem('token');
    if(token!=null){
      this._employeeService.create(data).subscribe(
        (res) => {
          if(res.status==204){
            this.router.navigate(['/login'])
          }else{
          this.isSubmit = false;
          this.getAllEmployee();
          this.employeeForm.reset();
          console.log(res);
          this.alert.success = res;
          setTimeout(function(){
          }, 2000);
        }
        },
        (err) => {
          if (err.status == 401) {
            console.log(err.status);
          } else {
            this.isLoading = false;
            console.log(err.status);
          }
        }
      );
    }else {
        this.router.navigate(["/login"]);
      }
  }

  updateEmployee(id: number, data: any) {
    console.log(id);
    
    this._employeeService.update(id, data).subscribe(
      (res) => {
        this.isSubmit = false;
        this.employeeForm.reset();
        this.getAllEmployee();
        this.alert.success = res;
        this.btnAction = '';
        // console.log(res);
      },
      (err) => {
        if (err.status == 401) {
          console.log(err.status);
        } else {
          this.isLoading = false;
          console.log(err.status);
        }
      }
    );
  }

  deleteEmployee(id: number) {
    this.employeeId=id;
    this._employeeService.delete(this.employeeId).subscribe(
      (res) => {
        
        console.log(res);
        this.getAllEmployee();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getEmployeeById(id:number){
    this.employeeId=id;
    this._employeeService.find(this.employeeId).subscribe(
      (res)=>{
       console.log(res);

      },
      (err)=>{
         console.log(err);
         
      }
    );

  }
  
  
}