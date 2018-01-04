import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponentComponent } from './../Component/login-component/login-component.component';
import { UserComponentComponent } from './../Component/user-component/user-component.component';
import { TeacherComponentComponent } from './../Component/teacher-component/teacher-component.component';
import {RoomComponentComponent}from './../Component/room-component/room-component.component'
import {ContactComponent}from './../Component/contact/contact.component'
import {TeacherInfoComponent}from './../Component/teacher-info/teacher-info.component'
import {RoomInfoComponent}from './../Component/room-info/room-info.component'
import {StudentInfoComponent}from './../Component/student-info/student-info.component'
import {AddTeacherComponent}from './../Component/add-teacher/add-teacher.component'
import {AddStudentComponent}from './../Component/add-student/add-student.component'
import {AddRoomComponent}from './../Component/add-room/add-room.component'
import {UpdateRoomComponent}from './../Component/update-room/update-room.component'
import {UpdateStudentComponent}from './../Component/update-student/update-student.component'




const appRoutes: Routes = [
   {path:"",component:LoginComponentComponent,pathMatch:'full'},
   {path:'login', component: LoginComponentComponent,pathMatch:'full'},
   {path:'students',component:UserComponentComponent,pathMatch:'full'},
   {path:'teachers',component:TeacherComponentComponent,pathMatch:'full'},
   {path:'rooms',component:RoomComponentComponent,pathMatch:'full'},
   {path:'contact',component:ContactComponent,pathMatch:'full'},
   {path:'teacher-info',component:TeacherInfoComponent,pathMatch:'full'},
   {path:'room-info',component:RoomInfoComponent,pathMatch:'full'},
   {path:'room-info/:type',component:RoomInfoComponent,pathMatch:'full'},
   {path:'student-info',component:StudentInfoComponent,pathMatch:'full'},
   {path:'add-teacher',component:AddTeacherComponent,pathMatch:'full'},
   {path:'add-student',component:AddStudentComponent,pathMatch:'full'},
   {path:'add-room',component:AddRoomComponent,pathMatch:'full'},
   {path:'update-room',component:UpdateRoomComponent,pathMatch:'full'},
   {path:'update-student',component:UpdateStudentComponent,pathMatch:'full'},

      
];
export const appRoutesProviders: any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes); 