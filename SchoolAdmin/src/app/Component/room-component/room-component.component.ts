import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {IRoom} from './../../Interface/room'
import { Observable } from 'rxjs'
import {RoomService } from './../../Service/room.service'
import {TeacherService} from './../../Service/teacher.service'


@Component({
  selector: 'rooms',
  templateUrl: './room-component.component.html',
  styleUrls: ['./room-component.component.css']
})
export class RoomComponentComponent implements OnInit {

 rooms: IRoom[];
 room: IRoom = new IRoom();
 errorMessage: String;
 observableRooms: Observable<IRoom[]>
 observableRoom: Observable<IRoom>


  constructor(private _roomService: RoomService,
              private router: Router,
              private _teacherService: TeacherService) { }

  ngOnInit() {
    this.getRooms();
  }
  getRooms():void {
       this.observableRooms = this._roomService.getAllRooms();
       this.observableRooms.subscribe(
         rooms => this.rooms = rooms,
         error => this.errorMessage = <any>error);
  }

   roomInfo(id:number): void {
       this._roomService.changeSelectedRoom(id);
       this.router.navigate(['/room-info']);
   }

     teacherInfo(id:number) : void {
       this._teacherService.changeSelectedTeacher(id);
       this.router.navigate(['/teacher-info']);

     }

     addRoom() : void {
       this.router.navigate(['/add-room']);
     }
     
    
     
}

 

  
  
   
