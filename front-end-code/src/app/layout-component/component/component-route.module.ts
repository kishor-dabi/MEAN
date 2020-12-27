import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponentComponent } from './main-component.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DefaultComponent } from './default/default.component';
import { AuthGuard } from '../../service/auth.guard';
import { RegisterComponent } from './register/register.component';
import { TaskComponent } from './task/task.component';
import { DeveloperAddComponent } from './developer-add/developer-add.component';
import { DevTaskComponent } from './dev-task/dev-task.component';


const routes: Routes = [
    {
        path: '',
        component: MainComponentComponent,
        children:[
            {
                path: '' , pathMatch:'full', redirectTo :'home',
                // component: DefaultComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'home',
                component: HomeComponent, canActivate : [AuthGuard]
            },
            {
                path: 'tasks',
                component: TaskComponent, canActivate : [AuthGuard]
            },
            {
                path: 'dev-tasks',
                component: DevTaskComponent, canActivate : [AuthGuard]
            },
            {
                path: 'developer',
                component: DeveloperAddComponent, canActivate : [AuthGuard]
            },
        ]
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
