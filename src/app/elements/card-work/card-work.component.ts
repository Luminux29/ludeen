import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import { WorkService } from 'src/app/service/work.service';
import { DialogAddWorkComponent } from '../dialog-add-work/dialog-add-work.component';

@Component({
  selector: 'app-card-work',
  templateUrl: './card-work.component.html',
  styleUrls: ['./card-work.component.css']
})
export class CardWorkComponent implements OnInit {

  isLoading = false;
  works : any[] = [];
  user_id: string
  constructor(private workService: WorkService, private userService: UserService, private dialog : MatDialog) { }

  ngOnInit(): void {
    //get user id
    this.user_id = this.userService.getUserId();

    //get work 
    this.isLoading=true;
    this.workService.getWorks();
    this.workService.getWorkUpdateListener()
    .subscribe(
      res =>{

        console.log("Succecss!");
        for(let i = 0; i < res.works.length; i++){
      
          //only get user's civil service eligibility
          if(res.works[i].user_id === this.user_id){
  
  
            this.works.push(res.works[i]);
  
          }
  
  
        }

        this.isLoading=false;

      },
      err =>{
        console.log("Error!" ,err);


      }
    )
  }

  
  readableDate(date : Date){


    return new Date(date).toLocaleDateString();;

  }

  onDelete(id: string){
   
    let willDelete = window.confirm("Are you sure you want to delete?");

    if(willDelete){

      this.workService.deleteWork(id)
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

  convertToPhp(temp: any){

    return "Php "+temp+".00"
  }

  convertBool(temp: boolean){

    if(temp){
      return "Yes";
    }
    else{
      return "No";
    }

  }


  onEditDialog(obj : any){
    const dialogRef = this.dialog.open(DialogAddWorkComponent, {
      data: obj
    });

    dialogRef.afterClosed().subscribe((res) => {
    
      if(res){
        window.location.reload();
      }
    });

  }


}
