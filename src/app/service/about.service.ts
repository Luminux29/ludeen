import {  Injectable } from '@angular/core';
import { catchError, Subject, throwError } from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import { serializeError } from 'serialize-error';

import { About } from '../models/about';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
private about: About[] = [];
private aboutUpdated = new Subject<{about: About[]}>();



  constructor(private http: HttpClient) { }



  getAbout(){

    return this.http
    .get<{about: About[], message: string}>("http://localhost:3000/api/abouts")
    .subscribe((aboutData) => {
  
  
      this.about = aboutData.about;
  
      this.aboutUpdated.next({
        about : [...this.about]
      });
  });
  
  }

  

  getAboutUpdatedListener(){
    return this.aboutUpdated.asObservable();
  }


  updateAbout(
    id: string,
    vision: string,
    mission:string,
    logo:string|File,
  ){

    let aboutData : FormData|About;

    if(typeof(logo) == 'object'){
      aboutData = new FormData();
      aboutData.append('id', id);
      aboutData.append('vision', vision);
      aboutData.append('mission',mission);
      aboutData.append('logo', logo, logo.name);



    }
    else{


      aboutData = {

        logo: logo,
        vision : vision,
        mission : mission,
        
      }


    }

    return this.http
    .put("http://localhost:3000/api/abouts/" + id, aboutData)
    .pipe(catchError(this.handleError));


  }

  deleteTraining(id: string)
  {
      return this.http.delete("http://localhost:3000/api/trainings/" + id);
  }
  
  getTrainingsByUserId(user_id:string){

    return this.http.get("http://localhost:3000/api/trainings/" + user_id)
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
