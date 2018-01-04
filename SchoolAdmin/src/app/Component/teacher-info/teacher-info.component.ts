import { Component, OnInit } from '@angular/core';
import {ITeacher} from './../../Interface/teacher'
import { Observable } from 'rxjs'
import {TeacherService } from './../../Service/teacher.service'
 import { NgForm } from '@angular/forms';
 import {Router} from '@angular/router';

@Component({
  selector: 'teacher-info',
  templateUrl: './teacher-info.component.html',
  styleUrls: ['./teacher-info.component.css']
})
export class TeacherInfoComponent implements OnInit {
teacher: ITeacher ;
NoOfVaccation: number;
errorMessage: String;
teacher_id: number;
observableTeacher: Observable<ITeacher>
isValidFormSubmitted = false;
teacherForm: ITeacher = new ITeacher();
isDataAvailable:boolean = false;
  constructor(private _teacherService : TeacherService,
             private _router:Router ) {
        
    
   }

  ngOnInit() {
     this.teacher_id = this._teacherService.selectedTeacherID();
     console.log(this.teacher_id);
    this.getTeacher(this.teacher_id);

  }

  

  
  getTeacher(teacher_id:number):void {
       this.observableTeacher = this._teacherService.getTeacher(teacher_id);
       this.observableTeacher.subscribe(
         teacher => { this.teacher = teacher,
         error => this.errorMessage = <any>error,
         this.isDataAvailable = true;
         });
  }
   manageTeacher(id:number): void {
    
  }
     addTeacher() : void {

     }

     teacherInfo(id:number) : void {

     }
     roomInfo(name:string): void {

     }

     onFormSubmit(form: NgForm) {
	   this.isValidFormSubmitted = false;
	   if(form.invalid){
		  return;	
	   } 	
	   this.isValidFormSubmitted = true;
	   this.teacherForm.no_of_call_off = form.controls['no_of_call_off'].value;
	   this.teacherForm.no_of_sick_leave = form.controls['no_of_sick_leave'].value;
	   this.teacherForm.no_of_pto = form.controls['no_of_pto'].value;
  }

  DeleteTeacher() {
        this._teacherService.deleteTeacher(this.teacher_id).subscribe(
        teacher => this.teacher = teacher,
        error => this.errorMessage = <any>error); 
         this._router.navigate(['/teachers']);
  }
    

}