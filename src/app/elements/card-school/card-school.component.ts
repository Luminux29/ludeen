import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SchoolService } from 'src/app/service/school.service';
import { UserService } from 'src/app/service/user.service';
import { DialogAddSchoolComponent } from '../dialog-add-school/dialog-add-school.component';

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

  onDelete(id:string){

    let willDelete = window.confirm("Are you sure you want to delete?");

    if(willDelete){

      this.schoolService.deleteSchool(id)
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



  onEditDialog(obj: any){

    const dialogRef = this.dialog.open(DialogAddSchoolComponent, {
      data: obj
    });

    dialogRef.afterClosed().subscribe((res) => {
    
      if(res){
        window.location.reload();
      }
    });



  }

}
