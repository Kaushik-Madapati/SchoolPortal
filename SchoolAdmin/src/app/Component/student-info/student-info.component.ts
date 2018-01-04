import { Component, OnInit } from '@angular/core';
import {IStudent} from './../../Interface/student'
import { Observable } from 'rxjs'
import {StudentService } from './../../Service/student.service';
import {Router} from '@angular/router';


@Component({
  selector: 'student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {

  students: IStudent[];
  student: IStudent = new IStudent();
  errorMessage: String;
  observableStudent: Observable<IStudent> 
  room_id:number;
  room_teacher: string;
  observableRoomTeacherName: Observable<string> 
  student_id: Number;
  deleteMessage: String;


  constructor(private _studentService:StudentService,
              private _router:Router) { 

  }

  ngOnInit() {
    this.student_id = this._studentService.selectedstudentID();
    this.getStudent(this.student_id);
  }

  getStudent(id:Number):void {
      this.observableStudent = this._studentService.getStudentInfo(id);
       this.observableStudent.subscribe(
         student => this.student = student,
         error => this.errorMessage = <any>error); 
  }
  Delete():void {
     this._studentService.deleteStudent(this.student_id).subscribe(
        student => this.student = student,
        error => this.errorMessage = <any>error); 
         this._router.navigate(['/students']);

     
  }

}
