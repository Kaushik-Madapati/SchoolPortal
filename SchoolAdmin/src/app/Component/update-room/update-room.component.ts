import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {IRoom} from './../../Interface/room'
import {ITeacher} from './../../Interface/teacher'
import {TeacherService } from './../../Service/teacher.service'
import {RoomService } from './../../Service/room.service'
import { Observable } from 'rxjs'


@Component({
  selector: 'update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.css']
})
export class UpdateRoomComponent implements OnInit {
 orgRoom: IRoom;
 observableOrgRoom: Observable<IRoom>
 teachers: ITeacher[];
 teacher: ITeacher = new ITeacher();
 room: IRoom = new IRoom();
 errorMessage: String;
 observableTeachers: Observable<ITeacher[]>
 selectedTeacher : string;
 currentRoomID: number;

  constructor(private _teacherService:TeacherService, private _roomService:RoomService) { }

  ngOnInit() {
    this.getTeachers();
    this.getOrgRoom();
  }


  getOrgRoom():void {
       this.observableOrgRoom = this._roomService.getRoomInfo(this.currentRoomID);
       this.observableOrgRoom.subscribe(
         orgRoom => this.orgRoom = orgRoom,
         error => this.errorMessage = <any>error);
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
      }
    }
  }

}




