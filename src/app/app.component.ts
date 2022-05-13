import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './service/user.service';
import Swal from 'sweetalert2'
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
        this.name = this.user.FirstName + " " + this.emptyStringIfNull(this.user.MidInit) + " " + this.user.LastName + " " + this.emptyStringIfNull(this.user.NameExtention);
        this.isLoading = false;
      })

    }
    
  }

  logout(){

   // let willLogout = window.confirm('Are you sure you want to logout?');
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to logout",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.logout();
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
      }
    })
    // if(willLogout){

    //   this.userService.logout();
    // }    

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
