import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CivilService } from 'src/app/service/civil.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-dialog-add-civil',
  templateUrl: './dialog-add-civil.component.html',
  styleUrls: ['./dialog-add-civil.component.css']
})
export class DialogAddCivilComponent implements OnInit {

  //VARIABLES
  isLoading = false;
  mode : string;
  form: FormGroup;

  //INJECT SERVICES
  constructor(
    public dialogRef: MatDialogRef<DialogAddCivilComponent>,
    private civilService: CivilService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService) { }

  //CHECK IF MODE IS EDIT OR CREATE
  ngOnInit(): void {


    //create form
    this.form = new FormGroup({

      'nameOfCivilServiceEligibility' : new FormControl(null, {validators:[Validators.required]}),
      'rating' : new FormControl(null),
      'dateOfExamination' : new FormControl(null, {validators:[Validators.required]}),
      'placeOfExamination' : new FormControl(null, {validators:[Validators.required]}),
      'licenseNo' : new FormControl(null),
      'dateOfValidity' : new FormControl(null)
    })

    //if data is null, mode is create, else it is edit
    this.mode = 'create';

    if(this.data){

      this.mode = 'edit';
      //patch values
      this.form.patchValue({nameOfCivilServiceEligibility : this.data.nameOfCivilServiceEligibility});
      this.form.patchValue({rating : this.data.rating});
      this.form.patchValue({dateOfExamination : this.data.dateOfExamination});
      this.form.patchValue({placeOfExamination : this.data.placeOfExamination});
      this.form.patchValue({licenseNo : this.data.licenseNo});
      this.form.patchValue({dateOfValidity : this.data.dateOfValidity});

    }

  }

  onCreateCivil(){
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

        //to create
        this.civilService.addCivil(  this.form.value.nameOfCivilServiceEligibility,
        this.form.value.rating,
        this.form.value.dateOfExamination,
        this.form.value.placeOfExamination,
        this.form.value.licenseNo,
        this.userService.getUserId(),
        this.form.value.dateOfValidity
        ).subscribe(

          res =>{
            //success!
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
            //error
            Swal.fire({
              icon: 'error',
              title: 'Oops!',
              text: 'Something went wrong!'
            }).then((result) => {
              if (result.isConfirmed) {
                this.isLoading = false;
              }
            });

          });
    }});

    }

    else {
        //to edit
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

        this.civilService.updateCivil(
          this.data._id,
          this.form.value.nameOfCivilServiceEligibility,
          this.form.value.rating,
          this.form.value.dateOfExamination,
          this.form.value.placeOfExamination,
          this.form.value.licenseNo,
          this.userService.getUserId(),
          this.form.value.dateOfValidity
        ).subscribe(
          res=>{
              //success
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
            //failed
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
