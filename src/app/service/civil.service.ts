import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, throwError } from 'rxjs';
import { serializeError } from 'serialize-error';
import { Civil } from '../models/civil';

@Injectable({
  providedIn: 'root'
})
export class CivilService {
  private civils: Civil[] = [];
  private civilsUpdated = new Subject<{civils: Civil []}>();

  constructor(private http: HttpClient) { }

  addCivil(
    nameOfCivilServiceEligibility: string,
    rating: string,
    dateOfExamination: Date,
    placeOfExamination: string,
    licenseNo:string,
    user_id: string,
    dateOfValidity: Date,
    ){

      let civilData: Civil = {

        nameOfCivilServiceEligibility: nameOfCivilServiceEligibility,
        rating: rating,
        dateOfExamination: dateOfExamination,
        placeOfExamination: placeOfExamination,
        licenseNo:licenseNo,
        user_id: user_id,
        dateOfValidity: dateOfValidity



      }

      return this.http.post("http://localhost:3000/api/civils", civilData)
      .pipe(catchError(this.handleError));
 
  

  }

  getCivilByUserId(user_id:string){

    return this.http.get("http://localhost:3000/api/civils/" + user_id)
    .pipe(catchError(this.handleError));
  }

  
getCivils(){

  return this.http
  .get<{civils: Civil[], message: string}>("http://localhost:3000/api/civils")
  .subscribe((civilData) => {


    this.civils = civilData.civils;

    this.civilsUpdated.next({
      civils : [...this.civils]
    });
});

}

getCivilUpdateListener(){
  return this.civilsUpdated.asObservable();
}


updateCivil(   id: string,
  nameOfCivilServiceEligibility: string,
    rating: string,
    dateOfExamination: Date,
    placeOfExamination: string,
    licenseNo:string,
    user_id: string,
    dateOfValidity: Date){

 
    let civilData : Civil;
    civilData = {
      nameOfCivilServiceEligibility: nameOfCivilServiceEligibility,
      rating: rating,
      dateOfExamination: dateOfExamination,
      placeOfExamination: placeOfExamination,
      licenseNo:licenseNo,
      user_id: user_id,
      dateOfValidity: dateOfValidity


      }

   
  
    
  
    return this.http
    .put("http://localhost:3000/api/civils/" + id, civilData)
    .pipe(catchError(this.handleError));




}

deleteCivil(id: string)
{
    return this.http.delete("http://localhost:3000/api/civils/" + id);
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
