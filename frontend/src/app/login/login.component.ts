import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _authService:AuthService,
    private _fb:FormBuilder,
    private router:Router
    ){

  }
  btnAction: string = '';
  isLoading = true;
  isSubmit = false;
  isUpdate = false;
  alert = {
    error: '',
    success: '',
  };
  errorMessage:String='';
 authForm= this._fb.group({
  username: ['', Validators.required],
  password: ['', Validators.required],

  
 });
  ngOnInit(): void {
 

  }

  createUser() {
    this._authService.login(this.authForm.value).subscribe(
      (res) => {
        if(res.status==200){
        this.alert.success = res;
        localStorage.setItem("token",res.body)
        this.router.navigate(['/employee']);
        localStorage.setItem('login','false')
        }else{
            this.errorMessage=res.message;
            localStorage.setItem('login','false')
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
  }
}
