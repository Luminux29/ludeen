import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { AuthData } from '../models/auth_data';
import { LoginData } from '../models/login_data';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import {serializeError} from 'serialize-error';
import { AdminServiceService } from './admin-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private name : string; 
  private pfp: string;
  private status: string;
  private cys: string;
  private isAuthenticated = false;
  private token:string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer : any;
  private u_id: string;
  private role:string;
  public users: User[]=[];
  private usersUpdated = new Subject<{users: User []}>();


  constructor(public http: HttpClient, public router: Router, private adminService: AdminServiceService) { }



 

  getCYS(){

    return this.cys;
  }

  setPFP(temp :string){

    this.pfp = temp;
    localStorage.setItem('pfp', temp);
    
  }
  setName(temp :string){
    
    this.name = temp;
    localStorage.setItem('name', temp);

  }

  getUsers(){

    
    this.http
    .get<{message: string, users: User[]}>("http://localhost:3000/api/users")
    .subscribe((userData) => {

  
        this.users = userData.users;
        this.usersUpdated.next({
          users : [...this.users]
        });
    });

  }

  updateFacultyStatus(id: string, status: string){

    let data = {
      status: status
    }

    return this.http
    .put("http://localhost:3000/api/users/updatestatus/" + id, data)
    .pipe(catchError(this.handleError));
  

  }

  geUsersUpdateListener(){
    return this.usersUpdated.asObservable();
  }

  deleteUser(u_id: string)
  {
      return this.http.delete("http://localhost:3000/api/users/" + u_id);
  }


  //CREATE USER BY ADMIN  
  createUserFromAdmin(
    profilePic: File,
    EmployeeNumber: string,
    LastName: string,
    FirstName: string,
    MI: string,
    NameExtention: string,
    birthdate: Date,
    age: string,
    PlaceOfBirth: string,
    gender: string,
    CivilStatus: string,
    height: string,
    weight: string,
    BloodType: string,
    gsis: string,
    pagibig: string,
    philHealth: string,
    sss: string,
    tin: string,
    citizenship: string,
    r_zipCode: string,
    r_lotNo: string,
    r_street: string,
    r_village: string,
    r_brgy: string,
    r_city: string,
    r_province: string,
    p_zipCode: string,
    p_LotNo: string,
    p_street: string,
    p_village: string,
    p_brgy: string,
    p_city: string,
    p_province: string,
    email: string,
    altEmail: string,
    password: string,
    TelNo: string,
    MobileNo: string
    ){
    
  
    
    const facultyDataForm = new FormData();
    facultyDataForm.append('profilePic', profilePic , profilePic.name);
    facultyDataForm.append("emp", EmployeeNumber);
    facultyDataForm.append('LastName', LastName);
    facultyDataForm.append('FirstName', FirstName);
    facultyDataForm.append('MI', MI);
    facultyDataForm.append('NameExtention', NameExtention);
    facultyDataForm.append('birthdate', new Date(birthdate).toISOString());
    facultyDataForm.append('age', age);
    facultyDataForm.append('PlaceOfBirth', PlaceOfBirth);
    facultyDataForm.append('gender', gender);
    facultyDataForm.append('CivilStatus', CivilStatus);
    facultyDataForm.append('height', height);
    facultyDataForm.append('weight', weight);
    facultyDataForm.append('BloodType', BloodType);
    facultyDataForm.append('gsis', gsis);
    facultyDataForm.append('pagibig', pagibig);
    facultyDataForm.append('philHealth', philHealth);
    facultyDataForm.append('sss', sss);
    facultyDataForm.append('tin', tin);
    facultyDataForm.append('citizenship', citizenship);
    facultyDataForm.append('r_zipCode', r_zipCode);
    facultyDataForm.append('r_lotNo', r_lotNo);
    facultyDataForm.append('r_street', r_street);
    facultyDataForm.append('r_village', r_village);
    facultyDataForm.append('r_brgy', r_brgy);
    facultyDataForm.append('r_city', r_city);
    facultyDataForm.append('r_province', r_province);
    facultyDataForm.append('p_zipCode', p_zipCode);
    facultyDataForm.append('p_LotNo', p_LotNo);
    facultyDataForm.append('p_street', p_street);
    facultyDataForm.append('p_village', p_village);
    facultyDataForm.append('p_brgy', p_brgy);
    facultyDataForm.append('p_city', p_city);
    facultyDataForm.append('p_province', p_province);
    facultyDataForm.append('email', email);
    facultyDataForm.append('altEmail', altEmail);
    facultyDataForm.append('password', password);
    facultyDataForm.append('TelNo', TelNo);
    facultyDataForm.append('MobileNo', MobileNo);
    facultyDataForm.append('status', "Pending");
    facultyDataForm.append('role', "Faculty");


    return this.http.post("http://localhost:3000/api/users/signup", facultyDataForm)
    .pipe(
      catchError(this.handleError)
      );
  
  }

 
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        
    }
    // Return an observable with a user-facing error message.
    const serialized = serializeError(error.error);
    return throwError(() => new Error(serialized.error.message));
  }
   
 
   

  getUserId(){
    return this.u_id;

  }
  getRole(){
    return this.role;

  }

  
  getRequestFacultyStudentName(user_id:string, faculty_id:string){

    const queryParams = `?user_id=${user_id}&faculty_id=${faculty_id}`;
    return this.http.get<{user_id: string, faculty_id:string}>("http://localhost:3000/api/users/findnames/" + queryParams)
    .pipe(catchError(this.handleError));

  }

  
  updateUser(
    id :string,
    profilePic: File | string,
    EmployeeNumber: string,
    LastName: string,
    FirstName: string,
    MI: string,
    NameExtention: string,
    birthdate: Date,
    PlaceOfBirth: string,
    gender: string,
    CivilStatus: string,
    height: string,
    weight: string,
    BloodType: string,
    gsis: string,
    pagibig: string,
    philHealth: string,
    sss: string,
    tin: string,
    citizenship: string,
    r_zipCode: string,
    r_lotNo: string,
    r_street: string,
    r_village: string,
    r_brgy: string,
    r_city: string,
    r_province: string,
    p_zipCode: string,
    p_LotNo: string,
    p_street: string,
    p_village: string,
    p_brgy: string,
    p_city: string,
    p_province: string,
    email: string,
    altEmail: string,
    TelNo: string,
    MobileNo: string,
    status: string,
    role: string
  ){


    let facultyDataForm : User | FormData;
    

    //if image is going to be updated, use FormData
    console.log('type of profile pic is : ' + typeof(profilePic));
    if(typeof(profilePic) =='object'){

      facultyDataForm= new FormData();
      facultyDataForm.append('id', id);
      facultyDataForm.append('profilePic', profilePic , profilePic.name);
      facultyDataForm.append("emp", EmployeeNumber);
      facultyDataForm.append('LastName', LastName);
      facultyDataForm.append('FirstName', FirstName);
      facultyDataForm.append('MI', MI);
      facultyDataForm.append('NameExtention', NameExtention);
      facultyDataForm.append('birthdate', new Date(birthdate).toISOString());
      facultyDataForm.append('PlaceOfBirth', PlaceOfBirth);
      facultyDataForm.append('gender', gender);
      facultyDataForm.append('CivilStatus', CivilStatus);
      facultyDataForm.append('height', height);
      facultyDataForm.append('weight', weight);
      facultyDataForm.append('BloodType', BloodType);
      facultyDataForm.append('gsis', gsis);
      facultyDataForm.append('pagibig', pagibig);
      facultyDataForm.append('philHealth', philHealth);
      facultyDataForm.append('sss', sss);
      facultyDataForm.append('tin', tin);
      facultyDataForm.append('citizenship', citizenship);
      facultyDataForm.append('r_zipCode', r_zipCode);
      facultyDataForm.append('r_lotNo', r_lotNo);
      facultyDataForm.append('r_street', r_street);
      facultyDataForm.append('r_village', r_village);
      facultyDataForm.append('r_brgy', r_brgy);
      facultyDataForm.append('r_city', r_city);
      facultyDataForm.append('r_province', r_province);
      facultyDataForm.append('p_zipCode', p_zipCode);
      facultyDataForm.append('p_LotNo', p_LotNo);
      facultyDataForm.append('p_street', p_street);
      facultyDataForm.append('p_village', p_village);
      facultyDataForm.append('p_brgy', p_brgy);
      facultyDataForm.append('p_city', p_city);
      facultyDataForm.append('p_province', p_province);
      facultyDataForm.append('email', email);
      facultyDataForm.append('altEmail', altEmail);
      facultyDataForm.append('TelNo', TelNo);
      facultyDataForm.append('MobileNo', MobileNo);


    }
    else{
    
    //  if image is not going to be updated , us JSON
    
      
      facultyDataForm = {

      id: id,
      EmployeeNumber: EmployeeNumber,
      LastName: LastName,
      FirstName: FirstName,
      MI: MI,
      NameExtention: NameExtention,
      birthdate: birthdate,
      PlaceOfBirth: PlaceOfBirth,
      gender: gender,
      CivilStatus: CivilStatus,
      height: height,
      weight: weight,
      BloodType: BloodType,
      gsis: gsis,
      pagibig: pagibig,
      philHealth: philHealth,
      sss: sss,
      tin: tin,
      citizenship: citizenship,
      r_zipCode: r_zipCode,
      r_lotNo: r_lotNo,
      r_street: r_street,
      r_village: r_village,
      r_brgy: r_brgy,
      r_city: r_city,
      r_province: r_province,
      p_zipCode: p_zipCode,
      p_LotNo: p_LotNo,
      p_street: p_street,
      p_village: p_village,
      p_brgy: p_brgy,
      p_city: p_city,
      p_province: p_province,
      password: null,
      TelNo: TelNo,
      MobileNo: MobileNo,
      email:email,
      altEmail: altEmail,
      status: status,
      role: role,
      profilePic: profilePic


    }
  

    }
  
        
  
    return this.http
    .put("http://localhost:3000/api/users/" + id, facultyDataForm)
    .pipe(catchError(this.handleError));
  
  }

getStatus(){
  const authInformation = this.getAuthData();
  return authInformation.status;

}
getPFP(){
  

  return this.pfp;
}
getName(){

  return this.name;

}

changePass(id: string, newPass : string){

  const formBody = {

    newpass : newPass

  }
  return this.http
  .put("http://localhost:3000/api/users/changepass/" + id, formBody)
  .pipe(catchError(this.handleError));

}

checkPass(id:string, password: string){

  const formBody ={
    password: password
  }

  return this.http.post("http://localhost:3000/api/users/checkpass/"+id, formBody)
  .pipe(catchError(this.handleError));

}

  //------------LOGIN USER ----------------------
  loginUser(email:string, password: string) : Observable<any>{

  
    const loginData : LoginData = {

      email:email,
      password: password

    };

    return this.http.post<{ token:string, expiresIn: number, u_id: string, role:string, status: string, name : string, pfp: string}>("http://localhost:3000/api/users/login", loginData)
    .pipe( map(response =>{

      const token = response.token;
      this.setToken(token);
      if(token){

        console.log("response.status: "+response.status);
        this.status = response.status;
        this.u_id = response.u_id;
        this.role = response.role;
        this.pfp = response.pfp;
        this.name = response.name;
        console.log(this.cys);
        const expiresInDuration  = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration *1000);
        this.saveAuthData(token, expirationDate, this.u_id, this.role, this.status, this.name, this.pfp);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
    

        console.log("Success!");
        this.router.navigate(['/profile-info']);
        //  if(this.role === 'Admin'){
        //   this.router.navigate(['/admin-dashboard']);
        // }
        // else if (this.role === 'Student'){

        //   this.router.navigate(['/dashboard']);
        // }
        // else{

        //   this.router.navigate(['/dashboard']);
        // }
       }},
       catchError(this.handleError)));
    
 

  
  }

  setToken(token: string){

    this.token = token;
  }
  
  setUID(id:string){
    this.u_id = id;
  }

  setRole(role:string){
    this.role = role;
  }

  

  getAuth(){
    return this.isAuthenticated;
  }

  getToken(){
    return this.token;
  }

  logout(){
      this.token = null;
      this.isAuthenticated = false;
      this.authStatusListener.next(false);
      this.router.navigate(['/sign-in']);
      this.clearAuthData();
      clearTimeout(this.tokenTimer);
      this.role = null;
      this.name = null;
      this.pfp = null;
      this.u_id = null;

  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  saveAuthData(token: string, expirationDate: Date, u_id: string, role:string, status: string, name : string, pfp: string){

    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString()); 
    localStorage.setItem('u_id', u_id);
    localStorage.setItem('role', role);
    localStorage.setItem('status', status);
    localStorage.setItem('name', name);
    localStorage.setItem('pfp', pfp);


  }

  private clearAuthData(){

    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("u_id");
    localStorage.removeItem("role");
    localStorage.removeItem('status');
    localStorage.removeItem('name');
    localStorage.removeItem('pfp');


  }

  autoAuthUser(){

    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0){

      this.token = authInformation.token;
      this.u_id = authInformation.u_id;
      this.role = authInformation.role;
      this.status = authInformation.status;
      this.pfp = authInformation.pfp;
      this.name = authInformation.name;
      this.setAuthTimer(expiresIn/1000);
      this.isAuthenticated = true;
      this.authStatusListener.next(true);

    }


  }



  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    const u_id = localStorage.getItem('u_id');
    const role = localStorage.getItem('role');
    const status = localStorage.getItem('status');
    const name = localStorage.getItem('name');
    const pfp = localStorage.getItem('pfp');

    
    if(!token || !expirationDate){
      return null;
    }
    
    return {

        token: token,
        expirationDate : new Date(expirationDate),
        u_id: u_id,
        role: role,
        status: status,
        name: name,
        pfp: pfp



      };

    

  }

  setAuthTimer(duration: number){

    this.tokenTimer = setTimeout(() =>{
      this.logout();

    }, duration * 1000);

  }



  //find user by role

  getUserByRole(role:string){
    
    return this.http.get("http://localhost:3000/api/users/"+ role)
    .pipe(catchError(this.handleError));
   
  }

  getUser(id:string){

 
    return this.http.get("http://localhost:3000/api/users/find/" + id)
    .pipe(catchError(this.handleError));

  }

  
}
