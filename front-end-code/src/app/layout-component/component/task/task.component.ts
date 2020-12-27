import { Component, OnInit } from '@angular/core';
import { add } from 'date-fns';
import  * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

import { ApiService } from 'src/app/service/api.service';
declare var $:any;
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasklists:any = [];
  managerlists:any = [];
  taskObj:any = {user_id:''};
  user_type:any = null;
  devList:any = [];
  maxDate = new Date();

  constructor(private api:ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    
    this.getTaskList();
    this.getAllManager();
    this.getAllDev();
    this.user_type = localStorage.getItem('user_type');
  }
  getTaskList(){
    this.taskObj = {user_id:'', status:'pending'}
    this.api.GET('task/').subscribe(
      data => {
        this.tasklists = data        
      },error =>{

      })
  }

  getAllManager(){
    this.api.GET('user/manager/').subscribe(
      data => {
        this.managerlists = data        
      },error =>{

      })
  }

  gettaskByID(id){
    this.api.GET('task/'+id).subscribe(
      data => {
        this.taskObj = data        
      },error =>{

      })
  }

  saveTask(addTask){
    
    if (addTask.valid) {
      this.taskObj.due_date = moment(this.taskObj.due_date).format()

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

        this.toastr.success('Deleted.');
      },error =>{
        this.toastr.error(error.error?.message ? error.error?.message : 'Something went wrong.');
      })
  }
  getAllDev(){
    this.api.GET('user/developer').subscribe(
      data => {
        this.devList = data;  
      },error =>{
        this.toastr.error(error.error?.message ? error.error?.message : 'Something went wrong.');
      })
  }
}
