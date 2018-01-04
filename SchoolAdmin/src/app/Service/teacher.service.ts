import { Injectable } from '@angular/core';
import {ITeacher} from './../Interface/teacher'
import {TEACHERS} from './../Interface/mock-teacher'
import {Observable} from 'rxjs'
import {Observer} from 'rxjs/Observer'
import {Http, Headers,Response} from  '@angular/http'
import 'rxjs/Rx';

@Injectable()
export class TeacherService {

  private _selectedTeacherID : number ;

  teacherChanges$ : Observable<Number>;
  private _observer : Observer<Number>;

  constructor(private http: Http) { 
      this.teacherChanges$ = new Observable(observer => 
      this._observer = observer );

  }

     url ="http://localhost:3000/api/teacher";

  changeSelectedTeacher(id:number) {
     this._selectedTeacherID = id;
  }

  selectedTeacherID(): number {
     return this._selectedTeacherID;
  }
     // Get all Teacher from DB
    getAllTeachers():Observable <ITeacher[]> {
      // return Observable.of(TEACHERS);
      return this.http.get(this.url).map(this.extractData)
      .catch(this.handleErrorObservable);  

    }

      //Get teacher Info based on ID
     getTeacher(id:number):Observable <ITeacher> {
      var updateURL = this.url + '/' + id;
      console.log(id);
        return this.http.get(updateURL).map(this.extractData)
      .catch(this.handleErrorObservable); 

    }

    // Updated Teacher Info
    updateTeacher(id:number,teacher:ITeacher): Observable <ITeacher>{
    var updateURL = this.url + '/' + id;
    var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Headers', 'Content-Type')
     return this.http.put(updateURL, teacher,{headers: headers}).map(this.extractData)
      .catch(this.handleErrorObservable); 
    }


    /// Delete USer
    deleteTeacher(id:number): Observable <ITeacher>{
      console.log(' teacher service delete user');
    var delURL = this.url + '/' + id;
     return this.http.delete(delURL)
        .map(this.extractData)
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
    addTeacher(teacher:ITeacher): Observable <ITeacher>{
    console.log(' user service Add user ');
    console.log(teacher.name, teacher.email, teacher.phone);
    var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Headers', 'Content-Type')
       return this.http.post(this.url, JSON.stringify(teacher), {headers: headers})
        .map(this.extractData)
      .catch(this.handleErrorObservable); 
    }

    findTeacherByName(name:String) : Observable <Number> {
    var findURL = this.url + '/' +  'find' + '/' + name;
     return this.http.get(findURL)
        .map(this.extractData)
      .catch(this.handleErrorObservable); 


    }


}
