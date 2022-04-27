import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import { SchoolService } from 'src/app/service/school.service';

@Component({
  selector: 'app-dialog-add-school',
  templateUrl: './dialog-add-school.component.html',
  styleUrls: ['./dialog-add-school.component.css']
})
export class DialogAddSchoolComponent implements OnInit {

  types : any[] = [

    {value: 'Elementary'},
    {value: 'Secondary'},
    {value: 'Vocational'},
    {value: 'College'},
    {value: 'Graduate School'}



  ]
  isLoading = false;
  id:string;
  form: FormGroup;
  constructor( public dialogRef: MatDialogRef<DialogAddSchoolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private facultyService: UserService,
    private schoolService: SchoolService) {

      //this.isLoading = true;
      this.id = this.facultyService.getUserId();

      this.form = new FormGroup({

        'nameOfSchool' : new FormControl(null, {validators:[Validators.required]}),
        'course' : new FormControl(null, {validators:[Validators.required]}),
        'fromYear' : new FormControl(null, {validators:[Validators.required]}),
        'toYear' : new FormControl(null),
        'highestLevel' : new FormControl(null, {validators:[Validators.required]}),
        'yearGraduated' : new FormControl(null, {validators:[Validators.required]}),
        'honors' : new FormControl(null, {validators:[Validators.required]}),
        'type' : new FormControl(null, {validators:[Validators.required]})



      })


    }

  ngOnInit(): void {
  }

  onCreateSchool(){

    this.isLoading = true;

    if(this.form.invalid){
      return;
    }

    this.schoolService.addSchool(this.form.value.nameOfSchool,
      this.form.value.course,
      this.form.value.fromYear,
      this.form.value.toYear,
      this.form.value.highestLevel,
      this.form.value.yearGraduated,
      this.form.value.honors,
      this.form.value.type,
      this.id
    ).subscribe(
      res=>{

        this.isLoading = false;
        window.alert('Success');
        this.dialogRef.close('success');


      },
      err =>{

        this.isLoading = false;
        window.alert('error');
        console.log(err)

      }
    );



  }

  onNoClick(){
    this.dialogRef.close();
  }

}
