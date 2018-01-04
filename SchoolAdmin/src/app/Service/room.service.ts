import { Injectable } from '@angular/core';
import {IRoom} from './../Interface/room'
import {ROOMS} from './../Interface/mock-room'
import {Observable} from 'rxjs'
import {Observer} from 'rxjs/Observer'
import {ITeacher} from './../Interface/teacher'
import 'rxjs/add/operator/map';
import {Http, Headers,Response} from  '@angular/http'
import 'rxjs/Rx';
import {TeacherService} from './../Service/teacher.service'
import {IIDplaceHolder} from './../Interface/idPlaceHolder'


@Injectable()
export class RoomService {
room: IRoom = new IRoom();
observableRoom: Observable<IRoom>

teacher:ITeacher = new ITeacher();
observableTeacher : Observable<ITeacher>

    errorMessage: String;
   private _selectedRoomID : number ;
   private _selectedRoomName : String;

  roomChanges$ : Observable<number>;
  private _observer : Observer<number>;

   roomNameChanges$ : Observable<String>;
  private _observerName : Observer<String>;


  url ="http://localhost:3000/api/room";

  constructor(private http: Http, private _teacherSerivce : TeacherService) { 
      this.roomChanges$ = new Observable(observer => 
      this._observer = observer ); 

      this.roomNameChanges$ = new Observable(observer => 
      this._observerName = observer ); 
  }


   changeSelectedRoom(id:number) {
     this._selectedRoomID = id;
  }


   selectedRoomID(): number {
     return this._selectedRoomID;
  }

   changeSelectedRoomName(name:String) {
     this._selectedRoomName = name;
  }


   selectedRoomName(): String {
     return this._selectedRoomName;
  }


  getAllRooms():Observable <IRoom[]> {
     // return Observable.of(ROOMS);
      return this.http.get(this.url).map(this.extractData)
      .catch(this.handleErrorObservable);  

    }
    private extractData(res: Response) {
    	let body = res.json();
      console.log(body);
        return body;
    }
    private handleErrorObservable (error: Response | any) {
      //	console.error(error.message || error);
	     return Observable.throw(error.message || error);
    }

    getRoomInfoFromID(roomID: number): void {

      this.observableRoom = this.getRoomInfo(roomID);
      this.observableRoom.subscribe(
         room => this.room = room,
         error => this.errorMessage = <any>error);

    }

    getTeacherNameFromRoodID(id: number): void {
       this.observableTeacher = this._teacherSerivce.getTeacher(id);
      this.observableTeacher.subscribe(
         teacher => this.teacher = teacher,
         error => this.errorMessage = <any>error);

    }

    getTeacherName(roomid:number) : Observable<String>{
      // Get Room Info
      this.getRoomInfoFromID(roomid);
      this.getTeacherNameFromRoodID(this.room.teacherID);
      return Observable.of(this.teacher.name);
    }

    getRoomInfo(id:number) : Observable<IRoom> {
     // return Observable.of(ROOMS[0]);
     var updateURL = this.url + '/' + id;
      console.log(id);
        return this.http.get(updateURL).map(this.extractData)
      .catch(this.handleErrorObservable);
    }

    getRoomID(roomName:String):Observable<number> {
      return Observable.of(0);
    }

     // Updated Teacher Info
    updateRoom(id:number,room:IRoom): Observable <IRoom>{
    var updateURL = this.url + '/' + id;
    var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Headers', 'Content-Type')
     return this.http.put(updateURL, room,{headers: headers}).map(this.extractData)
      .catch(this.handleErrorObservable); 
    }

    /// Delete USer
    deleteRoom(id:number): Observable <IRoom>{
      console.log(' room service delete user');
    var delURL = this.url + '/' + id;
     return this.http.delete(delURL)
        .map(this.extractData)
      .catch(this.handleErrorObservable); 
    }

   addRoom(room:IRoom): Observable <IRoom>{
    console.log(' user service Add user ');
    console.log(room.name, room.phone, room.teacherID, room.teacher_name);
    var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Headers', 'Content-Type')
       return this.http.post(this.url, JSON.stringify(room), {headers: headers})
        .map(this.extractData)
      .catch(this.handleErrorObservable); 
    }

     
    getRoomFromName(name:string) : Observable<IRoom>{
       console.log(' room service find room');
    var findURL = "http://localhost:3000/api/room_find" + '/' + name;
       console.log(findURL);
     return this.http.get(findURL)
        .map(this.extractData)
      .catch(this.handleErrorObservable); 


    }


}



  





