import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import  * as moment from 'moment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userObj:any = {user_type:2}
  maxDate = new Date();

  constructor(private api:ApiService,private router:Router,  private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  saveDev(addTask){
    
    
    if (addTask.valid) {
      this.userObj.date_of_birth = moment(this.userObj.date_of_birth).format()
      this.userObj.age = parseInt(moment(this.userObj.date_of_birth).from(moment()))

        this.api.REGISTER('user/', this.userObj).subscribe(
          data => {
            
            this.userObj = {};
            if (data) {
              
              this.router.navigate(['/login'])
            }
            this.toastr.success('Success.');            
          },error =>{
            console.log(error);
            
            this.toastr.error(error.error?.message ? error.error?.message : 'Something went wrong.');
          })
      }

  }

}
