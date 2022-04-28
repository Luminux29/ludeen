import { ElementRef, Injectable } from '@angular/core';
import { catchError, Subject, throwError } from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {map} from 'rxjs';
import { serializeError } from 'serialize-error';
import { UserService } from './user.service';
import { AdminServiceService } from './admin-service.service';
import { Training } from '../models/training';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
private trainings: Training[] = [];
private trainingUpdated = new Subject<{trainings: Training[]}>();



  constructor(private http: HttpClient) { }



  getTrainings(){

    return this.http
    .get<{trainings: Training[], message: string}>("http://localhost:3000/api/trainings")
    .subscribe((trainingsData) => {
  
  
      this.trainings = trainingsData.trainings;
  
      this.trainingUpdated.next({
        trainings : [...this.trainings]
      });
  });
  
  }

  

  getTrainingsUpdateListener(){
    return this.trainingUpdated.asObservable();
  }

  addTraining(
    title: string,
    fromDate:Date,
    toDate:Date,
    noOfHours: number,
    typeOfLearningDevelopment:string,
    conductor: string,
    certificate: File,
    user_id: string){

      console.log(typeof(certificate));
    
    let reqData = new FormData();

    reqData.append("title", title);
    reqData.append("fromDate", new Date(fromDate).toISOString());
    reqData.append("toDate", new Date(toDate).toISOString());
    reqData.append("noOfHours", noOfHours.toString());
    reqData.append("typeOfLearningDevelopment", typeOfLearningDevelopment);
    reqData.append("conductor", conductor);
    reqData.append("certificate", certificate, certificate.name);
    reqData.append("user_id",user_id);


    return this.http.post("http://localhost:3000/api/trainings", reqData)
    .pipe(catchError(this.handleError));

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

//   getRequest(id : string){
//     return this.http.get("http://localhost:3000/api/requests/find/" + id)
//     .pipe(catchError(this.handleError));

//   }

//   getRequestByStatus(status : string){
//     return this.http.get("http://localhost:3000/api/requests/" + status)
//     .pipe(catchError(this.handleError));

//   }

//   deleteRequest(requestId: string){

//   return this.http.delete("http://localhost:3000/api/requests/" + requestId)
//   .pipe(catchError(this.handleError));

//   }

//   private handleError(error: HttpErrorResponse) {
//     if (error.status === 0) {
//       // A client-side or network error occurred. Handle it accordingly.
//       console.error('An error occurred:', error.error);
//     } else {
//       // The backend returned an unsuccessful response code.
//       // The response body may contain clues as to what went wrong.
//       console.error(
//         `Backend returned code ${error.status}, body was: `, error.error);
        
//     }
//     // Return an observable with a user-facing error message.
//     const serialized = serializeError(error.error);
//     return throwError(() => new Error(serialized.error.message));
//   }
   



// updateRequest(id:string, 
//   subject:string, 
//   faculty_id:string, 
//   user_id:string, 
//   status: string, 
//   creator:string, 
//   desc: string, 
//   dateRequested: string, 
//   dateAccepted:Date, 
//   semester:string, 
//   year: number, 
//   note:string, 
//   cys:string,
//   verdict:string,
//   request_form: File | string){

//     let requestData: FormData | Request
//     //adding file
//     if(typeof(request_form)==='object'){

//       let now = new Date();
//       console.log('request form is object ' + (request_form as File).name);
//       requestData = new FormData();
//       requestData.append('request_id', id);
//       requestData.append('subject', subject);
//       requestData.append('faculty_id', faculty_id);
//       requestData.append('user_id', user_id);
//       requestData.append('status', status);
//       requestData.append('desc', desc);
//       requestData.append('creator', creator);
//       requestData.append('dateRequested', dateRequested);
//       console.log("dto sa service: "+now.toISOString());
//       requestData.append('dateAccepted', now.toISOString());
//       requestData.append('semester', semester);
//       requestData.append('year', year.toString());
//       requestData.append('semester', semester);
//       requestData.append('note', note);
//       requestData.append('cys', cys);
//       requestData.append('verdict', verdict);
//       requestData.append('request_form', request_form, (request_form as File).name);

      
//     }

//     else{

//       console.log('request form is string');

//       let now = new Date();

//        requestData  = {
//           request_id: id,
//           subject: subject,
//           faculty_id: faculty_id,
//           user_id: user_id,
//           status: status,
//           desc: desc,
//           creator: creator,
//           dateRequested: new Date(dateRequested),
//           dateAccepted: now,
//           semester: semester,
//           year: year,
//           note: note,
//           cys: cys,
//           verdict: verdict,
//           request_form: request_form as string,
         
  
//         }

//     }

  
    
//     return this.http.put("http://localhost:3000/api/requests/" + id, requestData);
    

//   }






}
