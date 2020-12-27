import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  counts:any = {}
  managerId = ''
  constructor(private api:ApiService,  private toastr: ToastrService) { }

    ngOnInit(): void {
      this.managerId = JSON.parse(localStorage.getItem('user_data')).id
      this.getAllCounts();
    }

    getAllCounts(){
      this.api.GET('admin-dashboard/'+this.managerId).subscribe(
        (data:any) => {
          this.counts = data
          this.counts.totaltask = 0
          for (const iterator of data.task) {
            this.counts[iterator._id] = iterator.count;
            this.counts.totaltask += iterator.count;
          }
          
        },error =>{
          this.toastr.error(error.error?.message ? error.error?.message : 'Something went wrong.');

        })
    }


}
