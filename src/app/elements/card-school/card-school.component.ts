import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SchoolService } from 'src/app/service/school.service';
import { UserService } from 'src/app/service/user.service';
import { DialogAddSchoolComponent } from '../dialog-add-school/dialog-add-school.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-card-school',
  templateUrl: './card-school.component.html',
  styleUrls: ['./card-school.component.css']
})
export class CardSchoolComponent implements OnInit {

  schools : any [] = [];
  isLoading = false;
  primarySchools : any[] = [];
  secondarySchools : any[] = [];
  vocationalSchools : any[] = [];
  collegeSchools : any[] = [];
  graduateSchools : any[] = [];



  constructor(private schoolService : SchoolService, private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.refreshSchoolData();

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
        this.schoolService.deleteSchool(id)
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



  onEditDialog(obj: any){

    const dialogRef = this.dialog.open(DialogAddSchoolComponent, {
      width: '450px',
      data: obj
    });

    dialogRef.afterClosed().subscribe((res) => {
      if(res){

        window.location.reload();

      }
    });
  }

  refreshSchoolData(){

    this.schools.splice(0);
    this.primarySchools.splice(0);
    this.secondarySchools.splice(0);
    this.collegeSchools.splice(0);
    this.vocationalSchools.splice(0);
    this.graduateSchools.splice(0);
    this.isLoading = true;

    this.schoolService.getSchools();
    this.schoolService.getSschoolsUpdateListener()
    .subscribe(
      res =>{

        this.schools = res.schools;
        console.log(res);
        //get primary schools
        for(let i = 0; i < this.schools.length; i++){

          if(this.schools[i].user_id === this.userService.getUserId()){

            if(this.schools[i].type === 'Elementary'){

              this.primarySchools.push(this.schools[i]);
            }

            if(this.schools[i].type === 'Secondary'){

              this.secondarySchools.push(this.schools[i]);
            }

            if(this.schools[i].type === 'Vocational'){

              this.vocationalSchools.push(this.schools[i]);
            }
            if(this.schools[i].type === 'College'){

              this.collegeSchools.push(this.schools[i]);
            }
            if(this.schools[i].type === 'Graduate Studies'){

              this.graduateSchools.push(this.schools[i]);
            }

          }



        }
    this.isLoading = false;



      }
    )



  }


  presentIfStringIfNull(temp:any){

    if (temp === undefined || temp === null || temp === '' || temp === 'null') {
     return "Present";
     }
    else{
      return temp;
    }

  }

  openAddSchoolDialog(){
    const dialogRef = this.dialog.open(DialogAddSchoolComponent, {
      width: '450px',
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      //after closing dialog, refresh the table
      if(result){

        window.location.reload();

      }

    });


  }

}
