import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {IRoom} from './../../Interface/room'
import {IStudent} from './../../Interface/student'
import { Observable } from 'rxjs'
import {RoomService } from './../../Service/room.service'
import {StudentService} from './../../Service/student.service'


@Component({
  selector: 'add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  rooms: IRoom[];
  student: IStudent = new IStudent();
 room: IRoom = new IRoom();
 errorMessage: String;
 observableRooms: Observable<IRoom[]>
 selectedRoom : String;

  constructor(private _roomService: RoomService, private _router:Router, private _studentSerivce : StudentService) { }

  ngOnInit() {
    this.getRooms();
  }

  getRooms():void {
       this.observableRooms = this._roomService.getAllRooms();
       this.observableRooms.subscribe(
         rooms => this.rooms = rooms,
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


  addStudent(): void  {
     console.log("add student in controller");
    console.log(this.student.name);
    console.log(this.student.parent_email);
    console.log(this.student.parent_name);
    console.log(this.student.parent_phone);
    console.log(this.student.room);;
      this.student.roomID= 0;
      this.student.room = this.selectedRoom;
      this._studentSerivce.addStudent(this.student).subscribe (
            error =>  this.errorMessage = <any>error);

      this._router.navigate(['/students']);

  }
   

}
 
