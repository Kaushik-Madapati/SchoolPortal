import { Injectable } from '@angular/core';
import {Report} from './../Interface/Report'
import {REPORTS} from './../Interface/mock-report'
import {Observable} from 'rxjs'
import {Observer} from 'rxjs/Observer'
import {Http, Headers,Response } from  '@angular/http'
import { HttpClient } from '@angular/common/http';

import 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private _selectedReportID : Number ;
  public records: any[] = [];

 

  reportChanges$ : Observable<Number>;
  private _observer : Observer<Number>;

  constructor(private http:Http) { 
    this.reportChanges$ = new Observable(observer => 
      this._observer = observer );

  }

  changeSelectedReport(id:Number) {
    this._selectedReportID = id;
 }

 selectedReportID(): Number {
  return this._selectedReportID;
}

getAllReports():Observable <Report[]> {
  return Observable.of(REPORTS);
 // return this.http.get(this.csvUrl, { responseType: 'text' }).map(this.extractData)
 // .catch(this.handleErrorObservable);  

}








}



