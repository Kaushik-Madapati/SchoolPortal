import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {IRoom} from './../../Interface/room'
import {ITeacher} from './../../Interface/teacher'

import { Observable } from 'rxjs'
import {RoomService } from './../../Service/room.service'
import {TeacherService } from './../../Service/teacher.service'

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  rooms: IRoom[];
  room: IRoom = new IRoom();
  errorMessage: String;
  observableRooms: Observable<IRoom[]>
  teachers: ITeacher[];
  teacher: ITeacher = new ITeacher();
  observableTeachers: Observable<ITeacher[]>


  constructor(private _teacherService : TeacherService, private _roomService: RoomService) { }

  ngOnInit() {
    this.getTeachers();
    this.getRooms();
  }
  getTeachers():void {
       this.observableTeachers = this._teacherService.getAllTeachers();
       this.observableTeachers.subscribe(
         teachers => this.teachers = teachers,
         error => this.errorMessage = <any>error);
  }
  getRooms():void {
       this.observableRooms = this._roomService.getAllRooms();
       this.observableRooms.subscribe(
         rooms => this.rooms = rooms,
         error => this.errorMessage = <any>error);
  }

  sendRoomMessage(id:number): void {

  }
  sendTeacherMessage(id:number): void {
    
  }

  ContactAllStudents() : void {

  }
   ContactAllTeachers() : void {
    
  }


}
