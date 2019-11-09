import { Component, OnInit } from '@angular/core';
import {ReportService } from './../../Service/report.service'
import {Report} from './../../Interface/report'
import { Observable } from 'rxjs'
import {AngularCsv} from 'angular7-csv/dist/Angular-csv'


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

 reports: Report[];
 csvOptions = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalseparator: '.',
  showLabels: true,
  showTitle: false,
  title: 'Report ',
  useBom: true,
  noDownload: false,
  headers: ["Id", "C_EnglishLevel", "C_MathLevel", "C_PraticalLevel",
            "C_SensorialLevel", "C_When", "C_NoActivity","C_Where", 
            "C_EnglishComplete", "C_MathComplete", "C_PraticalComplete", "C_SensorialComplete"]
};


 report: Report = new Report();
 errorMessage: String;
  observableReports: Observable<Report[]>
  isDataAvailable:boolean = false;

 is_completed = ["Yes", "No"];
 where = ["Home", "School", "Both"]
 when = ["Morning", "Afternoon", "Both"];

  constructor(private _reportService : ReportService) { }

  ngOnInit() {
    this.getReports();
  }

  getReports():void {
    this.observableReports = this._reportService.getAllReports();
    this.observableReports.subscribe(
      reports => {this.reports = reports,
      error => this.errorMessage = <any>error,
      console.log(reports),
      this.isDataAvailable = true; });
}

downloadCSV(){
  //this.dtHolidays : JSONDATA , HolidayList : CSV file Name, this.csvOptions : file options
  new  AngularCsv(this.reports, "Report", this.csvOptions);
}

}




