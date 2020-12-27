import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  formSubmit = false

  constructor(private formBuilder: FormBuilder, private api:ApiService, private router: Router,  private toastr: ToastrService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      user_type: ['', [Validators.required]]
    });
  }

  get formValue() { return this.registerForm.controls; }

  login() {
    
    this.formSubmit = true
    if (this.registerForm.invalid) {
      return;
    }

    this.api.Login('user/login/', this.registerForm.value).subscribe(
      (data:any) => {
        if (data.token) {
          localStorage.setItem("token",data.token);
          localStorage.setItem("user_data",JSON.stringify(data));
          localStorage.setItem("user_type",this.registerForm.value.user_type);
          this.toastr.success('Login Success.');
          
          this.router.navigate(['home']);
        }
      },error =>{
        this.toastr.error(error.error?.message ? error.error?.message : 'Something went wrong.');
      })

  }

}
