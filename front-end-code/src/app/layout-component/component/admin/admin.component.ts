import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  counts:any = {}
  constructor(private api:ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllCounts()
  }

  getAllCounts(){
    this.api.GET('admin-dashboard/').subscribe(
      data => {
        this.counts = data
        
      },error =>{
        this.toastr.error(error.error?.message ? error.error?.message : 'Something went wrong.');
      })
  }

}
