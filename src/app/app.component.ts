import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isAuth= false;
  name: string;
  pfp: string;
  isLoading = false;
  user: User;
  title = 'mean-grade';
  constructor(public userService: UserService){}

  ngOnInit(): void {
    this.userService.autoAuthUser();
    this.isAuth = this.userService.getAuth();

    if(this.userService.getAuth()){
      
      this.isLoading = true;
      this.userService.getUser(this.userService.getUserId())
      .subscribe(res =>{
      
        this.user = res as User;
        this.name = this.user.FirstName + " " + this.emptyStringIfNull(this.user.MI) + " " + this.user.LastName + " " + this.emptyStringIfNull(this.user.NameExtention);
        this.isLoading = false;
      })

    }
    
  }

  logout(){

    let willLogout = window.confirm('Are you sure you want to logout?');
    if(willLogout){

      this.userService.logout();
    }    

  }

  emptyStringIfNull(name:any){

    if (name === undefined || name === null || name === '' || name === 'null') {

     return "";
     }
    else{
      return name;
    }

  }

}
