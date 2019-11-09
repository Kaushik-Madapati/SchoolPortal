import { Component, OnInit } from '@angular/core';
import {IStudent} from './../../Interface/student'
import { Observable } from 'rxjs'
import {StudentService } from './../../Service/student.service';
import {StudentBackground} from './../../Interface/student-background';
import {AngularCsv} from 'angular7-csv/dist/Angular-csv'

@Component({
  selector: 'app-student-background',
  templateUrl: './student-background.component.html',
  styleUrls: ['./student-background.component.css']
})
export class StudentBackgroundComponent implements OnInit {

  student_backgrounds: StudentBackground[];

  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    title: 'Your Holiday List :',
    useBom: true,
    noDownload: false,
    headers: ["Id", "age", "isFirstChild", "ethnicity",
              "siblings"]
  };

  student_background: StudentBackground = new StudentBackground();
  errorMessage: String;
  observableStudentBackground: Observable<StudentBackground []> 
  isDataAvailable:boolean = false;

  deleteMessage: String;

  constructor( private _studentService:StudentService) { }

  ngOnInit() {
    this.getBackground();
  }

  isFirstChild = ["Yes", "No"] 
  ethnicites = ["Asian", "American", "Non Asian"] 

  getBackground():void {
    this.observableStudentBackground = this._studentService.getAllBackground();
    this.observableStudentBackground.subscribe(
      student_backgrounds => {this.student_backgrounds = student_backgrounds,
      error => this.errorMessage = <any>error,
      this.isDataAvailable = true; });
}

downloadCSV(){
  //this.dtHolidays : JSONDATA , HolidayList : CSV file Name, this.csvOptions : file options
  new  AngularCsv(this.student_backgrounds, "Student_Background", this.csvOptions);
}


}



