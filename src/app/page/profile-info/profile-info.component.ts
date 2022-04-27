import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAccountComponent } from 'src/app/elements/add-account/add-account.component';
import { DialogAddSchoolComponent } from 'src/app/elements/dialog-add-school/dialog-add-school.component';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {



  profilePicPath : string;
  faculty : any;
  isLoading = false;
  name:string;
  id:string;
  age:string;

  constructor(private userService: UserService,private dialog : MatDialog ) { }

  ngOnInit(): void {

    this.isLoading=true;
    this.id = this.userService.getUserId();
    this.userService.getUser(this.id)
    .subscribe(res=>{
      this.isLoading=false;

      this.faculty = res;

      this.name = this.faculty.LastName + ", "+this.faculty.FirstName+ " "+ this.emptyStringIfNull(this.faculty.NameExtention) + " " + this.emptyStringIfNull(this.faculty.MI); 
      this.profilePicPath = this.faculty.profilePic;
      

    })


  }

  readableDate(date : Date){


    return new Date(date).toLocaleDateString();;

  }

  emptyStringIfNull(name:any){

    if (name === undefined || name === null) {

     return "";
     }
    else{
      return name;
    }

  }

  openAddSchoolDialog(){

    const dialogRef = this.dialog.open(DialogAddSchoolComponent, {
      data: this.userService.getUserId()
    });

    dialogRef.afterClosed().subscribe(result => {
      //after closing dialog, refresh the table
      if(result){

        window.location.reload();


      }
    });


  }

  getAge(bday: Date){

    let timeDiff = Math.abs(Date.now() - new Date(bday).getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    return age;

  }

  onEditDialog(id : string){

    const dialogRef = this.dialog.open(AddAccountComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      //after closing dialog, refresh the table
      if(result){

          window.location.reload();

      }
    });
  
  }

  // openAddSchoolDialog(){
  //   const dialogRef = this.dialog.open(DialogAddSchoolComponent, {
  //     data: this.userService.getUserId()
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     //after closing dialog, refresh the table

  //   });


  // }

  logout(){

    this.userService.logout();

  }
}
