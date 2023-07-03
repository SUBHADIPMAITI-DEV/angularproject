import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from './../employee.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
// import { Router } from '@angular/router';

@Component({
  selector: "app-show-employee",
  templateUrl: "./show-employee.component.html",
  styleUrls: ["./show-employee.component.css"],
})
export class ShowEmployeeComponent {
  constructor(
    private _fb: FormBuilder,
    private router:Router,
    private _employeeService: EmployeeService
  ) {}


  selected: any;
  dateChange(event: any) {
    console.log(event);
    this.selected = moment(new Date(event.target.value)).format("YYYY-MM-DD");
    console.log(moment(new Date(event)).format("YYYY-MM-DD"));
  }
  isLoading = true;
  isSubmit = false;
  isUpdate = false;
  isEdit:boolean=false;
  emp_id:any;
  alert = {
    error: "",
    success: "",
  };
  btnAction: string = "";
  empArray: any[] | object[] = [];
  categoryData = {};
  employeeId: number = 0;
  employeeForm = this._fb.group({
    name: ["", Validators.required],
    email: ["", Validators.required],
    position: ["", Validators.required],
    about: ["", Validators.required],
    joining_data: ["", Validators.required],
  });
  // empArray: any[] | object[] = [];
  ngOnInit(): void {
    this.getAllEmployee();
  }

  onSubmit() {
    this.isSubmit = true;
    this.updateEmployee(this.employeeForm.value);
  }

  p: number = 1;
  getAllEmployee() {
    // this.isLoading = true;
    this._employeeService.read().subscribe(
      (res) => {
        console.log(res.data);

        // this.isLoading = false;
        this.empArray = res;
        // console.log(res[0],"hello");
      },
      (err) => {
        // this.isLoading = false;
        console.log(err.status);
      }
    );
  }

  getEmployee(id: number) {
    let token:any=localStorage.getItem('token');
    if(token==undefined || token==null || token==""){
      this.router.navigate(['/login']);
    }
    this.emp_id=id;
    this._employeeService.find(id).subscribe(
      (res) => {
        let date=moment(new Date(res.joining_data)).format('YYYY-MM-DD');
        this.isEdit=true;
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

  updateEmployee(data: any) {
    let token:any=localStorage.getItem('token');
    if(token==undefined || token==null || token==""){
      this.router.navigate(['/login']);
    }
    this._employeeService.update(this.emp_id, data).subscribe(
      (res) => {
        this.isSubmit = false;
        this.employeeForm.reset();
        this.getAllEmployee();
        this.alert.success = res;
        this.btnAction = "";
        this.isEdit=false;
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
    let token:any=localStorage.getItem('token');
    if(token==undefined || token==null || token==""){
      this.router.navigate(['/login']);
    }
    this.employeeId = id;
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
}
