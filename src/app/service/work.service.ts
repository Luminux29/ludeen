import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, throwError } from 'rxjs';
import { serializeError } from 'serialize-error';
import { Work } from '../models/work';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  private works: Work[] = [];
  private workUpdated = new Subject<{works: Work[]}>();
  constructor(private http : HttpClient) { }

  
  addWork(
    toDate: Date,
    fromDate: Date,
    position: string,
    dept: string,
    monthlySalary: number,
    status: string,
    government : boolean,
    salaryGrade: string,
    user_id: string){

      let workData: Work = {
        toDate: toDate,
        fromDate: fromDate,
        position: position,
        dept: dept,
        monthlySalary: monthlySalary,
        status: status,
        government : government,
        salaryGrade: salaryGrade,
        user_id: user_id
      }

      return this.http.post("http://localhost:3000/api/works", workData)
      .pipe(catchError(this.handleError));
 
  

  }

  
getWorks(){

  return this.http
  .get<{works: Work[], message: string}>("http://localhost:3000/api/works")
  .subscribe((workData) => {


    this.works = workData.works;

    this.workUpdated.next({
      works : [...this.works]
    });
});

}

getWorkUpdateListener(){
  return this.workUpdated.asObservable();
}


updateWork(   id: string,
  toDate: Date,
    fromDate: Date,
    position: string,
    dept: string,
    monthlySalary: number,
    status: string,
    government : boolean,
    salaryGrade: string,
    user_id: string){

 
      let workData: Work = {
        toDate: toDate,
        fromDate: fromDate,
        position: position,
        dept: dept,
        monthlySalary: monthlySalary,
        status: status,
        government : government,
        user_id : user_id,
        salaryGrade: salaryGrade

      }

  
    return this.http
    .put("http://localhost:3000/api/works/" + id, workData)
    .pipe(catchError(this.handleError));



}

deleteWork(u_id: string)
{
    return this.http.delete("http://localhost:3000/api/works/" + u_id);
}


  

private handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was:` , error.error);

  }
  // Return an observable with a user-facing error message.
  const serialized = serializeError(error.error);
  return throwError(() => new Error(serialized.error.message));
}




}
