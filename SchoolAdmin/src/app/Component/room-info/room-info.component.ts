import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { ActivatedRoute } from '@angular/router';
import {IStudent} from './../../Interface/student'
import {IRoom} from './../../Interface/room'
import { Observable } from 'rxjs'
import {StudentService } from './../../Service/student.service'
import {RoomService } from './../../Service/room.service'

@Component({
  selector: 'room-info',
  templateUrl: './room-info.component.html',
  styleUrls: ['./room-info.component.css']
})
export class RoomInfoComponent implements OnInit {
  students: IStudent[];
  room : IRoom = new IRoom();

  student: IStudent = new IStudent();
  errorMessage: String;
  observableStudents: Observable<IStudent[]> 
  room_id:number;
  room_teacher: String;
  observableRoomTeacherName: Observable<string> 
  ObservableRoom: Observable<IRoom>;
  roomFromName: IRoom = new IRoom();
  observableRoomFromName: Observable<IRoom> 
  isDataAvailable:boolean = false;
  isTeacherNameAvailable:boolean = false;
  private sub: any;
  infoType : String;


  constructor(private _studentService : StudentService,
              private  _roomService : RoomService,
              private route:ActivatedRoute,
              private _router:Router ) { 

  }

  ngOnInit() {
           
    this.room_id = this._roomService.selectedRoomID();
    this.getRoomInfoFromID();
    this.getRoomStudents();
   // this.getRoomTeacherName();
    
  }


  getRoomInfoFromID() : void {
       this.ObservableRoom = this._roomService.getRoomInfo(this.room_id)
       this.ObservableRoom.subscribe(
         room => {this.room = room,
         error => this.errorMessage = <any>error,
          this.isDataAvailable = true;
           } ); 


     }

  gerRoomInfo(name:string) : void {
       this.observableRoomFromName = this._roomService.getRoomFromName(name)
       this.observableRoomFromName.subscribe(
         roomFromName => {this.roomFromName = roomFromName,
         error => this.errorMessage = <any>error,
          this.isDataAvailable = true;
           } ); 


     }

  getRoomTeacherName() {
      this.observableRoomTeacherName = this._roomService.getTeacherName(this.room_id)
       this.observableRoomTeacherName.subscribe(
         room_teacher => {this.room_teacher = room_teacher,
         error => this.errorMessage = <any>error,
         this.isTeacherNameAvailable = true;
        }); 
  }
  getRoomStudents():void {
      this.observableStudents = this._studentService.getRoomStudents(this.room_id)
       this.observableStudents.subscribe(
         students => this.students = students,
         error => this.errorMessage = <any>error); 
  }

  deleteRoom(): void {
        console.log("Delete Room");
       this._roomService.deleteRoom(this.room_id).subscribe(
        room => this.room = room,
        error => this.errorMessage = <any>error); 
         this._router.navigate(['/rooms']);

  }

 
}

