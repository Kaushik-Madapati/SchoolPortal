import { Injectable } from '@angular/core';
import {IStudent} from './../Interface/student'
import {STUDENTS} from './../Interface/mock-student'
import {Observable} from 'rxjs'
import {Observer} from 'rxjs/Observer'
import 'rxjs/add/operator/map';
import {Http, Headers,Response} from  '@angular/http'
import 'rxjs/Rx';

@Injectable()
export class StudentService {

   errorMessage: String;
   private _selectedStudentID : number ;

  studentChanges$ : Observable<number>;
  private _observer : Observer<number>;

  url ="http://localhost:3000/api/student";

  constructor(private http:Http) { 
     this.studentChanges$ = new Observable(observer => 
      this._observer = observer ); 
  }

   changeSelectedStudent(id:number) {
     this._selectedStudentID = id;
  }


   selectedstudentID(): number {
     return this._selectedStudentID;
  }

  getAllStudents():Observable <IStudent[]> {
     // return Observable.of(STUDENTS);
     return this.http.get(this.url).map(this.extractData)
      .catch(this.handleErrorObservable);  

    }
    getStudentInfo(id:number):Observable <IStudent> {
      // return Observable.of(STUDENTS[0]);
      var updateURL = this.url + '/' + id;
      console.log(id);
        return this.http.get(updateURL).map(this.extractData)
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

    getRoomStudents(room_id:number):Observable <IStudent[]> {
      return Observable.of(STUDENTS);

    }
    updateStudent(id:number,student:IStudent): Observable <IStudent>{
    var updateURL = this.url + '/' + id;
    var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Headers', 'Content-Type')
     return this.http.put(updateURL, student,{headers: headers}).map(this.extractData)
      .catch(this.handleErrorObservable); 
    }

    deleteStudent(id:Number): Observable <IStudent>{
      console.log(' room service delete user');
    var delURL = this.url + '/' + id;
     return this.http.delete(delURL)
        .map(this.extractData)
      .catch(this.handleErrorObservable); 
    }

    addStudent(student:IStudent): Observable <IStudent>{
    console.log(' user service Add user ');
    console.log(student.name, student.parent_name, student.parent_email, student.parent_phone);
    var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Headers', 'Content-Type')
       return this.http.post(this.url, JSON.stringify(student), {headers: headers})
        .map(this.extractData)
      .catch(this.handleErrorObservable); 
    }





}




  
  