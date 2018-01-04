import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ITeacher} from './../../Interface/teacher'
import { Observable } from 'rxjs'
import {TeacherService } from './../../Service/teacher.service'
import {RoomService} from  './../../Service/room.service'

@Component({
  selector: 'teachers',
  templateUrl: './teacher-component.component.html',
  styleUrls: ['./teacher-component.component.css']
})
export class TeacherComponentComponent implements OnInit {
 teachers: ITeacher[];
 
 teacher: ITeacher = new ITeacher();
 errorMessage: String;
  observableTeachers: Observable<ITeacher[]>
  isDataAvailable:boolean = false;

  constructor(private _teacherService : TeacherService, 
              private _router:Router, private _roomService: RoomService) { }

  ngOnInit() {
    this.getTeachers();
  }
  getTeachers():void {
       this.observableTeachers = this._teacherService.getAllTeachers();
       this.observableTeachers.subscribe(
         teachers => {this.teachers = teachers,
         error => this.errorMessage = <any>error,
         this.isDataAvailable = true; });
  }
    manageTeacher(id:number): void {
    
    }
     addTeacher() : void {
        
        this._router.navigate(['/add-teacher']);
     }

     teacherInfo(id:number) : void {
          console.log(id);
         this._teacherService.changeSelectedTeacher(id);   
         this._router.navigate(['/teacher-info']);

     }
     roomInfo(id:number): void {
          this._roomService.changeSelectedRoom(id);   
         this._router.navigate(['/room-info']);
     }

}
