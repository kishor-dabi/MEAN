import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponentComponent } from './main-component.component';
import { DefaultComponent } from './default/default.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ComponentRoutingModule } from './component-route.module';
import { PartialsModule } from '../partials/partials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { ManagerComponent } from './manager/manager.component';
import { DeveloperComponent } from './developer/developer.component';
import { TaskComponent } from './task/task.component';
import { DeveloperAddComponent } from './developer-add/developer-add.component';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './register/register.component';
import { DevTaskComponent } from './dev-task/dev-task.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import { MyDatePickerModule } from 'mydatepicker';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    MainComponentComponent,
    DefaultComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    ManagerComponent,
    DeveloperComponent,
    TaskComponent,
    DeveloperAddComponent,
    RegisterComponent,
    DevTaskComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    ToastrModule.forRoot(),
    ComponentRoutingModule,
    PartialsModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ]
})
export class ComponentModule { }
