import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import { WorkService } from 'src/app/service/work.service';
import { DialogAddWorkComponent } from '../dialog-add-work/dialog-add-work.component';
import Swal from 'sweetalert2'

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
        this.workService.deleteWork(id)
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
      }
    })


  }

    openAddWorkDialog(){

    const dialogRef = this.dialog.open(DialogAddWorkComponent, {
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
      width: '450px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((res) => {

      if(res){
        window.location.reload();
      }
    });

  }


}
