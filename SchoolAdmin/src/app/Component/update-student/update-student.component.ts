import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {IRoom} from './../../Interface/room'
import {IStudent} from './../../Interface/student'
import { Observable } from 'rxjs'
import {RoomService } from './../../Service/room.service'
import {StudentService } from './../../Service/student.service'

@Component({
  selector: 'update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {

 orgStudent: IStudent;
  rooms: IRoom[];
  student: IStudent = new IStudent();
 room: IRoom = new IRoom();
 errorMessage: String;
 observableRooms: Observable<IRoom[]>
 observableOrgStudent: Observable<IStudent>
 selectedRoom : string;
 orgStudentID : number;


  constructor(private _roomService: RoomService,
               private _router:Router,
               private _studentService: StudentService) { }

  ngOnInit() {
    this.getRooms();
    this.getCurrentStudent();
  }
  getRooms():void {
       this.observableRooms = this._roomService.getAllRooms();
       this.observableRooms.subscribe(
         rooms => this.rooms = rooms,
         error => this.errorMessage = <any>error);
  }

  getCurrentStudent() {
      this.observableOrgStudent = this._studentService.getStudentInfo(this.orgStudentID);
       this.observableOrgStudent.subscribe(
         orgStudent => this.orgStudent = orgStudent,
         error => this.errorMessage = <any>error);

  }
  onSelect(name:string) { 
    this.selectedRoom = null;
    for (var i = 0; i < this.rooms.length; i++)
    {
      if (this.rooms[i].name == name) {
        this.selectedRoom = this.rooms[i].name;
      }
    }
  }

}
  
