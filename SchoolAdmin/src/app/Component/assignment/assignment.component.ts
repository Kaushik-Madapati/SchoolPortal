import { Component, OnInit, Input } from '@angular/core';
import {AssignmentService } from './../../Service/assignment.service'
import {Assignment} from './../../Interface/assignment'
import { Observable } from 'rxjs'
import {AngularCsv} from 'angular7-csv/dist/Angular-csv'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  assignments: Assignment[];
  
  csvUrl: string = 'assets/final_report.csv';  

  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    title: 'Your Holiday List :',
    useBom: true,
    noDownload: false,
    headers: ["Id", "English Level", "Math Level", "Pratical Level",
              "Sensorial Level", "When", "No. Activity","Where"]
  };

  
 
 teacher: Assignment = new Assignment();
 records:any[] = []
 errorMessage: String;
  observableTeachers: Observable<Assignment[]>
  isDataAvailable:boolean = false;

  constructor(private _assingmentService : AssignmentService,
              private http: HttpClient ) { }
   
  @Input() assign:Assignment
  ngOnInit() {
    
  }

 /* getAssignments():void {
    this.observableTeachers = this._assingmentService.getAllAssignments();
    this.observableTeachers.subscribe(
      assignments => {this.assignments = assignments,
      error => this.errorMessage = <any>error,
      console.log(assignments),
      this.isDataAvailable = true; });
}*/
getAssignments():void {
  this.assignments = this._assingmentService.getAllAssignments();
  this.teacher =this.assignments.pop();
  console.log(this.teacher);

}

downloadCSV(){
  //this.dtHolidays : JSONDATA , HolidayList : CSV file Name, this.csvOptions : file options
  new  AngularCsv(this.assignments, "Assignment", this.csvOptions);
}

GenerateReport() {
  this.readCsvData();
}


readCsvData () {
   
  this.http.get(this.csvUrl , { responseType: 'text' })
  .subscribe(
    (data:any) => this.extractData(data),
    err => this.handleError(err)
  );
  
}

      

private extractData(res: Response) {
    
  let csvData = res['_body'] || '';
  const allTextLines = (<string> <unknown>res).split(/\r\n|\n/);
  //let allTextLines = res.split(/\r\n|\n/);
  let headers = allTextLines[0].split(',');
  let lines = [];

  
  //let headersRow = this.getHeaderArray(csvData);
   this.records = this.getDataRecordsArrayFromCSVFile(allTextLines, headers.length);
  // console.log(this.assignments);
   return this.assignments;
 
}


private handleError (error: any) {
  // In a real world app, we might use a remote logging infrastructure
  // We'd also dig deeper into the error to get a better message
  let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error(errMsg); // log to console instead
  return errMsg;
} 



 getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
  let csvArr = [];
  for (let i = 1; i < csvRecordsArray.length; i++) {
    let curruntRecord = (<string>csvRecordsArray[i]).split(',');
    if (curruntRecord.length == headerLength) {
      let csvRecord: Assignment = new Assignment();
      csvRecord._id = Number(curruntRecord[0].trim());
      csvRecord.english_level = Number(curruntRecord[1].trim());
      csvRecord.math_level = Number(curruntRecord[2].trim());
      csvRecord.pratical_level = Number(curruntRecord[3].trim());
      csvRecord.sensorial_level = Number(curruntRecord[4].trim());
      csvRecord.when = curruntRecord[5].trim();
      csvRecord.no_activity = Number(curruntRecord[6].trim());
      csvRecord.where = curruntRecord[7].trim();
      csvArr.push(csvRecord);
    }
  }
  return csvArr;
}



isValidCSVFile(file: any) {
  return file.name.endsWith(".csv");
}

getHeaderArray(csvRecordsArr: any) {
  let headers = (<string> csvRecordsArr[0]).split(',');
  let headerArray = [];
  for (let j = 0; j < headers.length; j++) {
    headerArray.push(headers[j]);
  }
  return headerArray;
}


}
