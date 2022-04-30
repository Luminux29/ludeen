import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from 'src/app/service/training.service';
import { UserService } from 'src/app/service/user.service';
import { DialogAddTrainingComponent } from '../dialog-add-training/dialog-add-training.component';

@Component({
  selector: 'app-card-training',
  templateUrl: './card-training.component.html',
  styleUrls: ['./card-training.component.css']
})
export class CardTrainingComponent implements OnInit {

  trainings : any [] = [];
  isLoading = false;

  user_id: string;
  constructor(private trainingService: TrainingService, private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.isLoading = true;
    this.user_id = this.userService.getUserId();

    this.trainingService.getTrainings();
    this.trainingService.getTrainingsUpdateListener()
    .subscribe(
      res=>{

        for(let i = 0; i < res.trainings.length; i++){

          if(res.trainings[i].user_id){

            this.trainings.push(res.trainings[i]);

          }



        }

          this.isLoading=false;
      },
      err=>{


      }
    )

  }


  
  readableDate(date : Date){


    return new Date(date).toLocaleDateString();;

  }

  onEditDialog(obj: any){
    const dialogRef = this.dialog.open(DialogAddTrainingComponent, {
      data: obj
     });
 
     dialogRef.afterClosed().subscribe(result => {
       //after closing dialog, refresh the table
       if(result){
 
         window.location.reload();

 
       }
     });

  }

  onDelete(id:string){
    let willDelete = window.confirm("Are you sure you want to delete training?");

    if(willDelete){

      this.trainingService.deleteTraining(id)
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

  
  openAddTrainingDialog(){

    const dialogRef = this.dialog.open(DialogAddTrainingComponent, {
      data: null
     });
 
     dialogRef.afterClosed().subscribe(result => {
       //after closing dialog, refresh the table
       if(result){
 
         window.location.reload();

 
       }
     });

  }

}
