import { Component, OnInit } from '@angular/core';
import {IStudent} from './../../Interface/student'
import { Observable } from 'rxjs'
import {StudentService } from './../../Service/student.service';
import {StudentAssessment} from './../../Interface/student-assessment';
import {AngularCsv} from 'angular7-csv/dist/Angular-csv'

@Component({
  selector: 'app-student-assessment',
  templateUrl: './student-assessment.component.html',
  styleUrls: ['./student-assessment.component.css']
})
export class StudentAssessmentComponent implements OnInit {

  student_assessments: StudentAssessment[];

  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    title: 'Your Holiday List :',
    useBom: true,
    noDownload: false,
    headers: ["Id", "EnglishAssessment", "MathAssessment", "PraticalAssessment",
              "SensorialAssessment"]
  };


  constructor(private _studentService:StudentService) { }

  student_assessment: StudentAssessment= new StudentAssessment();
  errorMessage: String;
  observableStudentAssessment: Observable<StudentAssessment []> 
  isDataAvailable:boolean = false;

  deleteMessage: String;


  ngOnInit() {
    this.getAssessment();
  }

  getAssessment():void {
    this.observableStudentAssessment = this._studentService.getAllAssessment();
    this.observableStudentAssessment.subscribe(
        student_assessments => {this.student_assessments = student_assessments,
      error => this.errorMessage = <any>error,
      this.isDataAvailable = true; });
}


downloadCSV(){
  //this.dtHolidays : JSONDATA , HolidayList : CSV file Name, this.csvOptions : file options
  new  AngularCsv(this.student_assessments, "Student_Assessment", this.csvOptions);
}



}




