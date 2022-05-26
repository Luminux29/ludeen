import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Training } from 'src/app/models/training';
import { TrainingService } from 'src/app/service/training.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-dialog-add-training',
  templateUrl: './dialog-add-training.component.html',
  styleUrls: ['./dialog-add-training.component.css']
})
export class DialogAddTrainingComponent implements OnInit {

  fileTitle:string;
  mode: string;
  form: FormGroup;
  fileTitlePrev: string;
  isLoading = false;
  constructor(private trainingService: TrainingService,
    public dialogRef: MatDialogRef<DialogAddTrainingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService) { }

  ngOnInit(): void {

    //create form
    this.form = new FormGroup({

      'title' : new FormControl(null, {validators: [Validators.required]}),
      'typeOfLearningDevelopment' : new FormControl(null,  {validators:[Validators.required]}),
      'conductor' : new FormControl(null, {validators:[Validators.required]}),
      'toDate' : new FormControl(null, {validators:[Validators.required]}),
      'fromDate' : new FormControl(null, {validators:[Validators.required]}),
      'noOfHours' : new FormControl(null, {validators:[Validators.required]}),
      'certificate' : new FormControl(null, {validators:[Validators.required]}),


    });


    this.mode = 'create';
    if(this.data){
      this.mode = 'edit';
      this.form.patchValue({title : this.data.title});
      this.form.patchValue({typeOfLearningDevelopment : this.data.typeOfLearningDevelopment});
      this.form.patchValue({conductor : this.data.conductor});
      this.form.patchValue({toDate : this.data.toDate});
      this.form.patchValue({fromDate : this.data.fromDate});
      this.form.patchValue({noOfHours : this.data.noOfHours});
      this.form.patchValue({certificate : this.data.certificate});
      this.fileTitlePrev = this.data.certificate;
    }


  }

  onCreateTraining(){

    if(this.form.invalid){

      console.log(this.findInvalidControls());
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

        this.trainingService.addTraining(
        this.form.value.title,
        this.form.value.fromDate,
        this.form.value.toDate,
        this.form.value.noOfHours,
        this.form.value.typeOfLearningDevelopment,
        this.form.value.conductor,
        this.form.value.certificate,
        this.userService.getUserId()
      )
      .subscribe(
        res=>{

          Swal.fire({
            icon: 'success',
            title: 'Success!',
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

        });


      }})


    }
    else{

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

      this.trainingService.updateTraining(
        this.data._id,
        this.form.value.title,
        this.form.value.fromDate,
        this.form.value.toDate,
        this.form.value.noOfHours,
        this.form.value.typeOfLearningDevelopment,
        this.form.value.conductor,
        this.form.value.certificate,
        this.userService.getUserId()
      )
      .subscribe(
        res=>{
          Swal.fire({
            icon: 'success',
            title: 'Success!',
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

  public findInvalidControls() {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
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

  onFilePicked(event: Event){

    const file = (event.target as HTMLInputElement).files[0];
    this.fileTitle = file.name;
    console.log();
    this.form.patchValue({certificate: file});
    this.form.get('certificate').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () =>{
      this.fileTitlePrev = reader.result as string;
  }
    reader.readAsDataURL(file);

  }


}
