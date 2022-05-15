import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import { SchoolService } from 'src/app/service/school.service';
import Swal from 'sweetalert2'

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
    {value: 'Graduate Studies'}

  ]
  isCheck = true;
  isLoading = false;

  id:string;
  mode : string;
  form: FormGroup;
  constructor( public dialogRef: MatDialogRef<DialogAddSchoolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private facultyService: UserService,
    private schoolService: SchoolService) {

      //this.isLoading = true;
      this.id = this.facultyService.getUserId();
      console.log("myId: " + this.id);
      this.form = new FormGroup({

        'nameOfSchool' : new FormControl(null, {validators:[Validators.required]}),
        'course' : new FormControl(null, {validators:[Validators.required]}),
        'fromYear' : new FormControl(null, {validators:[Validators.required]}),
        'toYear' : new FormControl(null),
        'highestLevel' : new FormControl(null),
        'yearGraduated' : new FormControl(null),
        'honors' : new FormControl(null),
        'checkBox' : new FormControl(true),
        'type' : new FormControl(null, {validators:[Validators.required]})



      })

      if(this.data){

        this.mode = 'edit';
        this.form.patchValue({nameOfSchool : this.data.nameOfSchool});
        this.form.patchValue({course : this.data.course});
        this.form.patchValue({fromYear : this.data.fromYear});
        this.form.patchValue({toYear : this.data.toYear});
        this.form.patchValue({checkBox : true});

        if(this.data.highestLevel){
          this.form.patchValue({highestLevel : this.data.highestLevel});
        this.form.patchValue({checkBox : false});

        }
        if( this.data.yearGraduated){

          this.form.patchValue({yearGraduated : this.data.yearGraduated});
        }

        this.form.patchValue({honors : this.data.honors});
        this.form.patchValue({type : this.data.type});


      }
      else{
        this.mode = 'create';

      }




    }

  ngOnInit(): void {


  }

  onCreateSchool(){




    if(this.form.invalid){
      return;
    }

    if(this.mode === 'create'){


      Swal.fire({
          title: 'Are you sure you want to add this information?',
          text: "",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#5a68f0',
          cancelButtonColor: '#f05a5a',
          confirmButtonText: 'Confirm'
      }).then((result) => {
      if (result.isConfirmed) {


          this.isLoading = true;
          this.schoolService.addSchool(
          this.form.value.nameOfSchool,
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

          Swal.fire({
            icon: 'success',
            title: 'Yehey!',
            text: 'Added information successfully!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.isLoading = false;
              this.dialogRef.close('success');
            }
          });



          },
          err=>{
            Swal.fire({
              icon: 'error',
              title: 'Oops!',
              text: 'Something went wrong!'
            }).then((result) => {
              if (result.isConfirmed) {
                this.isLoading = false;
              }
            });



          }
        );
      }})



    }
    else{

      //edit



      if(this.form.value.checkBox){
        this.form.value.highestLevel = null;
      }
      else{
        this.form.value.yearGraduated = null;
      }

      Swal.fire({
        title: 'Are you sure you want to update this information?',
        text: "",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#5a68f0',
        cancelButtonColor: '#f05a5a',
        confirmButtonText: 'Confirm'
      }).then((result) => {
      if (result.isConfirmed) {

      this.schoolService.updateSchool(
        this.data._id,
        this.form.value.nameOfSchool,
        this.form.value.course,
        this.form.value.fromYear,
        this.form.value.toYear,
        this.form.value.highestLevel,
        this.form.value.yearGraduated,
        this.form.value.honors,
        this.form.value.type
      )
      .subscribe(
        res=>{
          Swal.fire({
            icon: 'success',
            title: 'Yehey!',
            text: 'Information updated successfully!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.dialogRef.close("Success");
            }
          });

        },
        err=>{

          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Something went wrong!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.dialogRef.close();
            }
          });


        }
      );
    }});
    }
  }

  onNoClick(){
    Swal.fire({
      title: 'Are you sure you want to discard your progress?',
      text: "",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#5a68f0',
      cancelButtonColor: '#f05a5a',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close();
      }
    })

  }

}
