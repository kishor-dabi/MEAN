import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
declare var $;
@Component({
  selector: 'app-dev-task',
  templateUrl: './dev-task.component.html',
  styleUrls: ['./dev-task.component.css']
})
export class DevTaskComponent implements OnInit {


  tasklists:any = [];
  managerlists:any = [];
  taskObj:any = {user_id:''};
  user_type:any = null;
  devList:any = [];
  dev_id = null;
  constructor(private api:ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    
    this.user_type = localStorage.getItem('user_type');
    this.dev_id = JSON.parse(localStorage.getItem('user_data')).id;
    this.getTaskList();
    this.getAllManager();
    this.getAllDev();
  }
  getTaskList(){
    this.taskObj = {user_id:'', status:'pending'}
    this.api.GET('task/developer/'+this.dev_id).subscribe(
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

  gettaskByID(id){
    this.api.GET('task/'+id).subscribe(
      data => {
        this.taskObj = data        
      },error =>{
        this.toastr.error(error.error?.message ? error.error?.message : 'Something went wrong.');
      })
  }

  saveTask(addTask){
    
    if (addTask.valid) {

      if (this.taskObj.id) {
        let obj = JSON.parse(JSON.stringify(this.taskObj))
        delete obj.id
        this.api.PUT('task/'+this.taskObj.id, obj).subscribe(
          data => {
            $('#exampleModalCenter').modal('hide');
            this.toastr.success('Updated.');
            this.getTaskList();      
          },error =>{
            this.toastr.error(error.error?.message ? error.error?.message : 'Something went wrong.');
          })
      } else {
        this.api.POST('task/', this.taskObj).subscribe(
          data => {
            $('#exampleModalCenter').modal('hide'); 
            this.toastr.success('Success.');
                       // this.managerlists = data  
            this.getTaskList();      
          },error =>{
            this.toastr.error(error.error?.message ? error.error?.message : 'Something went wrong.');
          })
        }
      }

  }
  deleteTask(id){
    this.api.DELETE('task/'+id).subscribe(
      data => {
        this.taskObj = data        
      },error =>{
        this.toastr.error(error.error?.message ? error.error?.message : 'Something went wrong.');
      })
  }
  getAllDev(){
    this.api.GET('user/developer').subscribe(
      data => {
        this.devList = data        
      },error =>{
        this.toastr.error(error.error?.message ? error.error?.message : 'Something went wrong.');
      })
  }
}
