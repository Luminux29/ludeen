
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.css']
})
export class AccountCardComponent implements OnInit {

  @Input() status : string;
  public users : User[] = [];
  private userSub: Subscription = new Subscription;
  
  isLoading = false;

  p_address: string;
  r_address: string;

  constructor(private userService: UserService, private adminService: AdminServiceService) { }

  ngOnInit(): void {


    this.isLoading = true;
    this.adminService.getFacultyByStatus(this.status)
    .subscribe((userData) => {
      this.isLoading = false;
      console.log(userData['users']);
      this.users = userData['users'];
      
    },
    err =>{
      console.log(err);
    });


  }

  getFullName(fName: string, lName: string){

      return lName +", "+fName;
  }

  acceptFaculty(user: any, verdict : string){

  
    if(verdict === 'pending'){

      verdict = 're-appeal'

    }
    //accept faculty here
    let yes = window.confirm("Are you sure you want to " + verdict + " this faculty account validity?");
    
    if(yes){

      if(verdict === 'Appeal'){
        verdict = "Pending"

      }
      else if (verdict === "Accept"){
        verdict = "Accepted"

      }
      else {

        verdict = "Rejected"

      }
    
 
      this.userService.updateFacultyStatus(user._id, verdict)
      .subscribe(
        res=>{

          window.alert("Faculty successfully updated!");
          window.location.reload();

        },
        err=>{

          window.alert("Error! " + err);

        }
      )


  }

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

}
