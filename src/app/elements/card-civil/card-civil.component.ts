import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CivilService } from 'src/app/service/civil.service';
import { UserService } from 'src/app/service/user.service';
import { DialogAddCivilComponent } from '../dialog-add-civil/dialog-add-civil.component';

@Component({
  selector: 'app-card-civil',
  templateUrl: './card-civil.component.html',
  styleUrls: ['./card-civil.component.css']
})
export class CardCivilComponent implements OnInit {

  isLoading = false;
  civils : any[] = [];
  user_id: string
  constructor(private civilService: CivilService, private userService: UserService,private dialog : MatDialog) { }

  ngOnInit(): void {

    //get user id
    this.user_id = this.userService.getUserId();

    //get card-civil
    this.isLoading = true;
    this.civilService.getCivils();
    this.civilService.getCivilUpdateListener()
    .subscribe(res =>{

      
      console.log(res);

      for(let i = 0; i < res.civils.length; i++){
      
        //only get user's civil service eligibility
        if(res.civils[i].user_id === this.user_id){


          this.civils.push(res.civils[i]);

        }


      }

          this.isLoading=false;
    },
    err =>{

      console.log("Error");

    })
  }

  readableDate(date : Date){


    return new Date(date).toLocaleDateString();;

  }

  onEditDialog(obj : any){
    const dialogRef = this.dialog.open(DialogAddCivilComponent, {
      data: obj
    });

    dialogRef.afterClosed().subscribe((res) => {
    
      if(res){
        window.location.reload();
      }
    });

  }


  onDelete(id : string){

    let willDelete = window.confirm("Are you sure you want to delete?");

    if(willDelete){

      this.civilService.deleteCivil(id)
      .subscribe(
        res=>{
  
        
          window.alert("Success!");
          window.location.reload();
  
        },
        err=>{
  
          console.log(err);
          window.alert(err);
  
        }
      );

    }

  }







}
