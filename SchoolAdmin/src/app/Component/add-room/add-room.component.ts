import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {IRoom} from './../../Interface/room'
import {ITeacher} from './../../Interface/teacher'
import {TeacherService } from './../../Service/teacher.service'
import {RoomService } from './../../Service/room.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
 teachers: ITeacher[];
 teacher: ITeacher = new ITeacher();
 room: IRoom = new IRoom();
 errorMessage: String;
 observableTeachers: Observable<ITeacher[]>
 selectedTeacher : String;
 selectedTeacherID : number;


 constructor(private _teacherService:TeacherService,
            private _roomService: RoomService) { }

  ngOnInit() {
    this.getTeachers();
  }


  getTeachers():void {
       this.observableTeachers = this._teacherService.getAllTeachers();
       this.observableTeachers.subscribe(
         teachers => this.teachers = teachers,
         error => this.errorMessage = <any>error);
  }

  onSelect(name:string) { 
    this.selectedTeacher = null;
    for (var i = 0; i < this.teachers.length; i++)
    {
      if (this.teachers[i].name == name) {
        this.selectedTeacher = this.teachers[i].name;
        this.selectedTeacherID = this.teachers[i]._id;
      }
    }
  }
  addRoom():void {
    console.log("add room in controller");
    console.log(this.room.name);
    console.log(this.room.phone);
    console.log(this.room.teacherID);
      this.room.teacherID = this.selectedTeacherID;
      this.room.teacher_name = this.selectedTeacher;
      console.log(this.room.teacher_name);
      this._roomService.addRoom(this.room).subscribe (
            error =>  this.errorMessage = <any>error);
  }


}

