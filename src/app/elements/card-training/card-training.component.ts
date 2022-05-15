import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from 'src/app/service/training.service';
import { UserService } from 'src/app/service/user.service';
import { DialogAddTrainingComponent } from '../dialog-add-training/dialog-add-training.component';
import Swal from 'sweetalert2'

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

          if(res.trainings[i].user_id === this.userService.getUserId()){

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

      width: '450px',
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

    Swal.fire({
      title: 'Are you sure you want to delete this informtion?',
      text: "",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#5a68f0',
      cancelButtonColor: '#f05a5a',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {

      this.trainingService.deleteTraining(id)
      .subscribe(
        res=>{

          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Information deleted successfully!'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });

        },
        err=>{

          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Something went wrong!'
           })

        }
      );
    }});





  }


  openAddTrainingDialog(){

    const dialogRef = this.dialog.open(DialogAddTrainingComponent, {
      width: '450px',
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
