import { Injectable } from '@angular/core';
import {Assignment} from './../Interface/Assignment'
import {ASSIGNMENTS} from './../Interface/mock-assignment'
import {Observable} from 'rxjs'
import {Observer} from 'rxjs/Observer'
import {Http, Headers,Response} from  '@angular/http'
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  public records: Assignment[] ;


  csvUrl: string = 'assets/final_report.csv';  

  private _selectedAssignmentID : Number ;

  assignmentChanges$ : Observable<Number>;
  private _observer : Observer<Number>;


constructor(private http:HttpClient) { 
    this.assignmentChanges$ = new Observable(observer => 
      this._observer = observer );

  }

  changeSelectedAssignment(id:Number) {
    this._selectedAssignmentID = id;
 }

 selectedAssignmentID(): Number {
  return this._selectedAssignmentID;
}

/*getAllAssignments():Observable <Assignment[]> {
  //return Observable.of(ASSIGNMENTS);
  this.readCsvData();
  return Observable.of(this.records);
  /*return this.http.get(this.url).map(this.extractData)
  .catch(this.handleErrorObservable);  */

//} 

getAllAssignments():Assignment[] {
  //return Observable.of(ASSIGNMENTS);
  this.readCsvData();
  return this.records;
  /*return this.http.get(this.url).map(this.extractData)
  .catch(this.handleErrorObservable);  */
}

private handleErrorObservable (error: Response | any) {
  //	console.error(error.message || error);
   return Observable.throw(error.message || error);
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
   console.log(this.records[2]);
   return this.records;
 
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



