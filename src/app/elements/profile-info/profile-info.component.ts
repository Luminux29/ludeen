import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogChangePassComponent } from '../dialog-change-pass/dialog-change-pass.component';
import { UserService } from 'src/app/service/user.service';
import { AddAccountComponent } from '../add-account/add-account.component';
@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {


  ctr = 0;
  showFiller = false;
  profilePicPath : string;
  user : any;
  isLoading = false;
  name:string;
  id:string;
  age:string;



  constructor(private userService: UserService,
    private dialog : MatDialog,
   ) { }

  ngOnInit(): void {
this.isLoading = true;
    this.userService.getUser(this.userService.getUserId())
    .subscribe(
      res=>{
        this.isLoading = false;
        this.user = res;
        console.log(this.user);

      this.profilePicPath = this.user.profilePic;
      }
    )

  }


  presentRequiredDate(date: Date){

    if(date){

      return this.readableDate(date);

    }

    return "Present";


  }

  nullDateNotRequired(date: Date){

    if(date){

      return this.readableDate(date);

    }

    return "N/A";

  }



  readableDate(date : any){

    let _date = new Date(date);

    if(date){

      return new Date(_date).toLocaleDateString();;

    }
    else{
      return "Present"
    }

  }

  noAssignmentStringIfNull(name:any){

    if (name === undefined || name === null || name === '' || name === 'null') {

     return "N/A";
     }
    else{
      return name.toString();;
    }

  }

  emptyStringIfNull(name:any){

    if (name === undefined || name === null || name === '' || name === 'null' || name === 'undefined') {

     return "";
     }
    else{
      return name.toString();
    }

  }


  getAge(bday: Date){

    let timeDiff = Math.abs(Date.now() - new Date(bday).getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    return age;

  }

  changePass(id: string){

     //open dialog
     const dialogRef = this.dialog.open(DialogChangePassComponent, {

    });

    dialogRef.afterClosed().subscribe((res) => {

      if(res){
        window.location.reload();
      }

    });

  }

  onEditDialog(id : string){

    const dialogRef = this.dialog.open(AddAccountComponent, {width: '60%',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      //after closing dialog, refresh the table
      if(result){

          window.location.reload();

      }
    });

  }


  logout(){

    this.userService.logout();

  }
}
