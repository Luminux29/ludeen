import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, throwError } from 'rxjs';
import { serializeError } from 'serialize-error';
import { School } from '../models/school';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private schools: School[] = [];
  private schoolsUpdated = new Subject<{schools: School []}>();

  constructor(private http: HttpClient) { }





  //ADD SCHOOL
  addSchool(
    nameOfSchool: string,
    course: string,
    fromYear: string,
    toYear: string,
    highestLevel:string,
    yearGraduated:string,
    honors: string,
    type:string,
    user_id:string

  ){

  //let reqData = new FormData();

    // reqData.append("nameOfSchool", nameOfSchool);
    // reqData.append("course", course);
    // reqData.append("fromYear", fromYear);
    // reqData.append("toYear", toYear);
    // reqData.append("highestLevel", highestLevel);
    // reqData.append("yearGraduated", yearGraduated);
    // reqData.append("honors", honors);
    // reqData.append("type", type);
    // reqData.append("user_id", user_id);

  let reqData : any = {
    nameOfSchool:nameOfSchool,
    course:course,
    fromYear:fromYear,
    toYear:toYear,
    highestLevel:highestLevel,
    yearGraduated:yearGraduated,
    honors:honors,
    type:type,
    user_id:user_id
  }

  return this.http.post("http://localhost:3000/api/schools", reqData)
  .pipe(catchError(this.handleError));

}

getSchools(){

  return this.http
  .get<{subjects: School[], message: string}>("http://localhost:3000/api/schools")
  .subscribe((subjectData) => {


    this.schools = subjectData.subjects;

    this.schoolsUpdated.next({
      schools : [...this.schools]
    });
});

}

getSschoolsUpdateListener(){
  return this.schoolsUpdated.asObservable();
}

updateSchool(   id: string,
  nameOfSchool: string,
  course: string,
  fromYear: string,
  toYear: string,
  highestLevel:string,
  yearGraduated:string,
  honors: string,
  type:string){

 
    let schoolData : School;
    schoolData = {
      nameOfSchool:nameOfSchool,
      course:course,
      fromYear:fromYear,
      toYear:toYear,
      highestLevel:highestLevel,
      yearGraduated:yearGraduated,
      honors:honors,
      type:type,
      user_id:null
      }

   
  
    
  
    return this.http
    .put("http://localhost:3000/api/schools/" + id, schoolData)
    .pipe(catchError(this.handleError));




}

deleteSchool(u_id: string)
{
    return this.http.delete("http://localhost:3000/api/schools/" + u_id);
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
