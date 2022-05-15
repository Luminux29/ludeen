import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import { WorkService } from 'src/app/service/work.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-dialog-add-work',
  templateUrl: './dialog-add-work.component.html',
  styleUrls: ['./dialog-add-work.component.css']
})
export class DialogAddWorkComponent implements OnInit {

  selectedStatus = "";
  form: FormGroup;
  isLoading = false;
  mode : string;
  stats : any [] = [

    //'Permanent', 'Temporary', 'Part-time'

    {value: "Permanent"},
    {value: "Temporary"},
    {value: "Part-time"}

  ];

  constructor(private workService: WorkService,
    public dialogRef: MatDialogRef<DialogAddWorkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService) { }

  ngOnInit(): void {

    //create form
     //create form
     this.form = new FormGroup({

      'toDate' : new FormControl(null),
      'fromDate' : new FormControl(null,  {validators:[Validators.required]}),
      'position' : new FormControl(null, {validators:[Validators.required]}),
      'dept' : new FormControl(null, {validators:[Validators.required]}),
      'monthlySalary' : new FormControl(null, {validators:[Validators.required]}),
      'status' : new FormControl(null, {validators:[Validators.required]}),
      'salaryGrade' : new FormControl(null),
      'government' : new FormControl(null, {validators:[Validators.required]})

    })

    this.form.patchValue({government : false});

    this.selectedStatus = "Permanent"

    this.mode = 'create';

    if(this.data){
      this.mode = 'edit';
      //patch values
      this.form.patchValue({toDate : this.data.toDate});
      this.form.patchValue({fromDate : this.data.fromDate});
      this.form.patchValue({position : this.data.position});
      this.form.patchValue({dept : this.data.dept});
      this.form.patchValue({monthlySalary : this.data.monthlySalary});
      this.form.patchValue({status : this.data.status});
      this.form.patchValue({salaryGrade : this.data.salaryGrade});
      this.form.patchValue({government : this.data.government});
      this.selectedStatus = this.data.status;


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

  onCreateWork(){

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

      this.workService.addWork(
        this.form.value.toDate,
        this.form.value.fromDate,
        this.form.value.position,
        this.form.value.dept,
        this.form.value.monthlySalary,
        this.form.value.status,
        this.form.value.government,
        this.form.value.salaryGrade,
        this.userService.getUserId()
      ).subscribe(

        res=>{
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
        err =>{
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

        }

      );

    }})


    }

    else{

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

      this.workService.updateWork(
        this.data._id,
        this.form.value.toDate,
        this.form.value.fromDate,
        this.form.value.position,
        this.form.value.dept,
        this.form.value.monthlySalary,
        this.form.value.status,
        this.form.value.government,
        this.form.value.salaryGrade,
        this.userService.getUserId()
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
