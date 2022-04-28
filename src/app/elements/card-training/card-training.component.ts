import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/service/training.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-card-training',
  templateUrl: './card-training.component.html',
  styleUrls: ['./card-training.component.css']
})
export class CardTrainingComponent implements OnInit {

  trainings : any [] = [];
  isLoading = false;

  user_id: string;
  constructor(private trainingService: TrainingService, private userService: UserService) { }

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


  }

  onDelete(id:string){


  }

}
