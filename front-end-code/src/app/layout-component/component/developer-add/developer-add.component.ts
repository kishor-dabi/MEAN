import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
declare var $;
import  * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
// this.taskObj.due_date = moment(this.taskObj.due_date).format()

@Component({
  selector: 'app-developer-add',
  templateUrl: './developer-add.component.html',
  styleUrls: ['./developer-add.component.css']
})
export class DeveloperAddComponent implements OnInit {

  managerId:any = '';
  tasklists:any = [];
  managerlists:any = [];
  taskObj:any = {user_id:''};
  user_type: any = '';
  maxDate = new Date();

  constructor(private api:ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.managerId = JSON.parse(localStorage.getItem('user_data')).id
    this.taskObj.manager = this.managerId;
    this.user_type = localStorage.getItem('user_type')
    this.getdevList();
    this.getAllManager();
  }

  resetObj(){
    this.taskObj = {};
    this.taskObj.manager = this.managerId;

  }

  getdevList(){
    let url = ''
      url = 'user/alldeveloper/' + this.managerId

    this.api.GET(url).subscribe(
      data => {
        this.tasklists = data        
      },error =>{
        this.toastr.error(error.error?.message ? error.error?.message : 'Something went wrong.');
      })
  }

  getAllManager(){
    this.api.GET('user/manager/').subscribe(
      data => {
        this.managerlists = data        
      },error =>{
        this.toastr.error(error.error?.message ? error.error?.message : 'Something went wrong.');
      })
  }

  getDevByID(id){
    this.api.GET('user/developer/'+id).subscribe(
      data => {
        this.taskObj = data        
      },error =>{
        this.toastr.error(error.error?.message ? error.message : 'Something went wrong.');
      })
  }

  saveDev(addTask){
    
    if (addTask.valid) {

      this.taskObj.date_of_birth = moment(this.taskObj.date_of_birth).format()
      this.taskObj.age = parseInt(moment(this.taskObj.date_of_birth).from(moment()))

      // return 
      if (this.taskObj.id) {
        let obj = JSON.parse(JSON.stringify(this.taskObj))
        delete obj.id
        delete obj.password
        this.api.PUT('user/developer/'+this.taskObj.id, obj).subscribe(
          data => {
            $('#exampleModalCenter').modal('hide');
            this.taskObj = {};
            this.toastr.success('Updated.');
            this.taskObj.manager = this.managerId;

            this.getdevList();      
          },error =>{
            this.toastr.error(error.error?.message ? error.error?.message : 'Something went wrong.');
          })
      } else {
        this.api.POST('user/developer/', this.taskObj).subscribe(
          data => {
            $('#exampleModalCenter').modal('hide');            // this.managerlists = data  
            this.taskObj = {};
            this.toastr.success('Success.');
            this.taskObj.manager = this.managerId;

            this.getdevList();      
          },error =>{
            this.toastr.error(error.error?.message ? error.error?.message : 'Something went wrong.');
          })
        }
      }

  }
  deleteDev(id){
    this.api.DELETE('task/'+id).subscribe(
      data => {
        this.toastr.success('Deleted.');
      
      },error =>{
        this.toastr.error(error.error?.message ? error.error?.message : 'Something went wrong.');
      })
  }


}
