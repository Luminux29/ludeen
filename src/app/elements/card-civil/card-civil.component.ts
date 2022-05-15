import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CivilService } from 'src/app/service/civil.service';
import { UserService } from 'src/app/service/user.service';
import { DialogAddCivilComponent } from '../dialog-add-civil/dialog-add-civil.component';
import Swal from 'sweetalert2'

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
      width: '450px',
      data: obj
    });

    dialogRef.afterClosed().subscribe((res) => {

      if(res){
        window.location.reload();
      }
    });

  }


  onDelete(id : string){

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

      this.civilService.deleteCivil(id)
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

  openAddCivilDialog(){

    const dialogRef = this.dialog.open(DialogAddCivilComponent, {
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
