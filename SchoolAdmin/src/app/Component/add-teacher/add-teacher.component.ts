import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {IRoom} from './../../Interface/room'
import {ITeacher} from './../../Interface/teacher'
import { Observable } from 'rxjs'
import {RoomService } from './../../Service/room.service'
import {TeacherService } from './../../Service/teacher.service'

@Component({
  selector: 'add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  rooms: IRoom[];
  roomID : number;
  teacher: ITeacher = new ITeacher();
 room: IRoom = new IRoom();
 errorMessage: String;
 observableRooms: Observable<IRoom[]>
 observableRoomID: Observable<number>

 selectedRoom : String;

  constructor(private _roomService: RoomService, private _router:Router, private _teacherService: TeacherService) { }

  ngOnInit() {
    this.getRooms();
  }

  onSelect(name:string) { 
    this.selectedRoom = null;
    for (var i = 0; i < this.rooms.length; i++)
    {
      if (this.rooms[i].name == name) {
        this.selectedRoom = this.rooms[i].name;
        this.roomID = this.rooms[i]._id;
      }
    }
}

getRooms():void {
       this.observableRooms = this._roomService.getAllRooms();
       this.observableRooms.subscribe(
         rooms => this.rooms = rooms,
         error => this.errorMessage = <any>error);
  }

  
  addTeacher():void {
    console.log("add teacher in controller");
    console.log(this.teacher.name);
    console.log(this.teacher.phone);
    console.log(this.teacher.email);
      this.teacher.no_of_call_off = 0;
      this.teacher.no_of_pto = 0;
      this.teacher.no_of_sick_leave = 0;
      this.teacher.vaccationID = 0;
      this.teacher.description= null;
      this.teacher.roomID = this.roomID;
      this.teacher.roomName= this.selectedRoom;
      this._teacherService.addTeacher(this.teacher).subscribe (
            error =>  this.errorMessage = <any>error);
       this._router.navigate(['/teachers']);
  }

}

