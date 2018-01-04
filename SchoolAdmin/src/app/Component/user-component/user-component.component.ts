import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {IStudent} from './../../Interface/student'
import {IRoom} from './../../Interface/room'
import { Observable } from 'rxjs'
import {StudentService } from './../../Service/student.service'
import {TeacherService}  from './../../Service/teacher.service'
import {RoomService} from './../../Service/room.service'
import {IIDplaceHolder} from './../../Interface/idPlaceHolder'


@Component({
  selector: 'students',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {

  students: IStudent[];
  student: IStudent = new IStudent();
  errorMessage: String;
  observableStudents: Observable<IStudent[]> 
  selectedTeacherName :String;

  teacherID : number;
  observableTeacherID: Observable<number> 

 
  



  constructor(private _studentService : StudentService, private _router : Router,
              private _teacherService: TeacherService, private _roomService : RoomService) { }

  ngOnInit() {
    this.getStudents();
  }

  getTeacherID() : void {
     this.observableTeacherID = this._teacherService.findTeacherByName(this.selectedTeacherName)
       this.observableTeacherID.subscribe(
         teacherID => this.teacherID = teacherID,
         error => this.errorMessage = <any>error); 
  }
  
  getStudents():void {
      this.observableStudents = this._studentService.getAllStudents();
       this.observableStudents.subscribe(
         students => this.students = students,
         error => this.errorMessage = <any>error); 
  }
    manageStudent(id:number): void {
    
    }
     addStudent() : void {
      this._router.navigate(['/add-student']);

  }   

     studentInfo(id:number) : void {
       this._studentService.changeSelectedStudent(id); 
        this._router.navigate(['/student-info']);


     }

     
    
     roomInfo(id:number): void {
        this._roomService.changeSelectedRoom(id);
        this._router.navigate(['/room-info']);
       
     } 

     teacherInfo(teacher:String):void {
       this.selectedTeacherName = teacher;
       this._teacherService.changeSelectedTeacher(this.teacherID);
        this._router.navigate(['/teacher-info','name']);

     }

}
