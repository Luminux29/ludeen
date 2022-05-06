import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule,  FormGroup,FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide = true;
  fileTitleProfilePic: string;
  fileTitleProfilePicPrev: string;
  mainForm : FormGroup;
  fileTitleESig:string;
  imagePreviewESig: string;
  isLoading = false;
  selectedRole: string;





  constructor(private userService: UserService, private router: Router) { }


  ngOnInit(): void {

    this.mainForm = new FormGroup({

      'profilePic': new FormControl(null,{validators: [Validators.required]}),
      'EmployeeNumber': new FormControl(null),
      'LastName' : new FormControl(null, {validators: [Validators.required]}),
      'FirstName' : new FormControl(null, {validators: [Validators.required]}),
      'MidInit' : new FormControl(null),
      'NameExtention' : new FormControl(null),
      'birthdate' : new FormControl(null),
      'age' : new FormControl(null),
      'PlaceOfBirth' : new FormControl(null),
      'gender' : new FormControl(null),
      'CivilStatus' : new FormControl(null),
      'height' : new FormControl(null),
      'weight' : new FormControl(null),
      'BloodType' : new FormControl(null),
      'gsis' : new FormControl(null),
      'pagibig' : new FormControl(null),
      'philHealth' : new FormControl(null),
      'sss' : new FormControl(null),
      'tin' : new FormControl(null),
      'citizenship' : new FormControl(null),
      'r_zipCode' : new FormControl(null),
      'r_lotNo' : new FormControl(null),
      'r_street' : new FormControl(null),
      'r_village' : new FormControl(null),
      'r_brgy' : new FormControl(null),
      'r_city' : new FormControl(null),
      'r_province' : new FormControl(null),
      'p_zipCode' : new FormControl(null),
      'p_LotNo' : new FormControl(null),
      'p_street' : new FormControl(null),
      'p_village' : new FormControl(null),
      'p_brgy' : new FormControl(null),
      'p_city' : new FormControl(null),
      'p_province' : new FormControl(null),
      'email' : new FormControl(null, {validators: [Validators.required]}),
      'altEmail' : new FormControl(null),
      'password' : new FormControl(null, {validators: [Validators.required]}),
      'reEnterPassword' : new FormControl(null),
      'TelNo' : new FormControl(null),
      'MobileNo' : new FormControl(null)

    })



  }

  onRegister(){


    if(this.mainForm.invalid){
      console.log("Invalid yung mainForm");
      window.alert('Invalid Form' + this.findInvalidControls());
      return;
    }



    this.userService.createUserFromAdmin(
      this.mainForm.value.profilePic,
      this.mainForm.value.EmployeeNumber,
      this.mainForm.value.LastName,
      this.mainForm.value.FirstName,
      this.mainForm.value.MidInit,
      this.mainForm.value.NameExtention,
      this.mainForm.value.birthdate,
      this.mainForm.value.age,
      this.mainForm.value.PlaceOfBirth,
      this.mainForm.value.gender,
      this.mainForm.value.CivilStatus,
      this.mainForm.value.height,
      this.mainForm.value.weight,
      this.mainForm.value.BloodType,
      this.mainForm.value.gsis,
      this.mainForm.value.pagibig,
      this.mainForm.value.philHealth,
      this.mainForm.value.sss,
      this.mainForm.value.tin,
      this.mainForm.value.citizenship,
      this.mainForm.value.r_zipCode,
      this.mainForm.value.r_lotNo,
      this.mainForm.value.r_street,
      this.mainForm.value.r_village,
      this.mainForm.value.r_brgy,
      this.mainForm.value.r_city,
      this.mainForm.value.r_province,
      this.mainForm.value.p_zipCode,
      this.mainForm.value.p_lotNo,
      this.mainForm.value.p_street,
      this.mainForm.value.p_village,
      this.mainForm.value.p_brgy,
      this.mainForm.value.p_city,
      this.mainForm.value.p_province,
      this.mainForm.value.email,
      this.mainForm.value.altEmail,
      this.mainForm.value.password,
      this.mainForm.value.TelNo,
      this.mainForm.value.MobileNo



    ).subscribe(res => {
      console.log(res)
      window.alert('Success!');
      this.router.navigate(['/sign-in']);
    },
    error=>{
      window.alert('Error! ' +error.error['message']);

      console.log(error)
    });

  }


  onFilePickedProfilePic(event: Event){

    const file = (event.target as HTMLInputElement).files[0];
    this.fileTitleProfilePic = file.name;
    this.mainForm.patchValue({profilePic: file});
    this.mainForm.get('profilePic').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () =>{
        this.fileTitleProfilePicPrev = reader.result as string;
    }
    reader.readAsDataURL(file);

  }


  public findInvalidControls() {
    const invalid = [];
    const controls = this.mainForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
  }





}
