import { Component, OnInit } from '@angular/core';
import {Assignment} from './../../Interface/assignment'
import { HttpClient } from '@angular/common/http';
import {AngularCsv} from 'angular7-csv/dist/Angular-csv'

@Component({
  selector: 'app-today-task',
  templateUrl: './today-task.component.html',
  styleUrls: ['./today-task.component.css']
})
export class TodayTaskComponent implements OnInit {

  csvUrl: string = 'assets/final_report.csv'; 
  isDataAvailable:boolean = false;
 

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


  constructor(private http : HttpClient) {
    
    }

  ngOnInit() {
    //this.readCsvData();
  }

  readCsvData () {
   
    this.http.get(this.csvUrl , { responseType: 'text' })
    .subscribe(
      (data:any) => this.extractData(data),
      err => this.handleError(err),
    );
    
  }
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return errMsg;
  } 

  private extractData(res: Response) {
    
    let csvData = res['_body'] || '';
    const allTextLines = (<string> <unknown>res).split(/\r\n|\n/);
    //let allTextLines = res.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');
    let lines = [];
    this.records = this.getDataRecordsArrayFromCSVFile(allTextLines, headers.length);
    this.isDataAvailable = true;
    // console.log(this.assignments);

   
  }



  public records: any[] = [];  
 
  
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  

 
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == headerLength) {  
        let csvRecord: Assignment = new Assignment();  
        csvRecord._id = Number(curruntRecord[1].trim());  
        csvRecord.english_level = Number(curruntRecord[2].trim());  
        csvRecord.math_level = Number (curruntRecord[3].trim());  
        csvRecord.pratical_level = Number(curruntRecord[4].trim());  
        csvRecord.sensorial_level = Number(curruntRecord[5].trim());  
        csvRecord.when = curruntRecord[6].trim();  
        csvRecord.no_activity = Number(curruntRecord[7].trim());
        csvRecord.where = curruntRecord[8].trim();    
        csvArr.push(csvRecord);  
      }  
    }  
    return csvArr;  
  }  
  
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  

  GenerateReport() {
    this.readCsvData();
  }
  
  downloadCSV(){
    //this.dtHolidays : JSONDATA , HolidayList : CSV file Name, this.csvOptions : file options
    new  AngularCsv(this.records, "Assignment", this.csvOptions);
  }

}


 
