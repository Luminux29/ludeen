import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {


  selectedGender: string;
  selectedBloodType:string;
  selectedCivilStatus: string;
  user: any;
  hide;
  mode: string;
  mainForm : FormGroup;
  imagePreviewPFP: string = '../../../assets/images/default_cict.png';
  fileTitleProfilePic: string;
  fileTitleProfilePicPrev: string;
  isLoading = false;
  id : string;
  constructor(
    public dialogRef: MatDialogRef<AddAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private userService: UserService) { }

  ngOnInit(): void {
    
    console.log(this.data);
    this.id = this.data;
    this.isLoading= true;
    if(this.data){

      //edit account
      this.mode = 'edit';
      console.log('editing...');

    }
    else{

      this.mode = 'create';

    }

   // this.role = this.userService.getRole();

  
    this.mainForm = new FormGroup({

      'profilePic': new FormControl(null,{validators: [Validators.required]}),
      'EmployeeNumber': new FormControl(null),
      'LastName' : new FormControl(null, {validators: [Validators.required]}),
      'FirstName' : new FormControl(null, {validators: [Validators.required]}),
      'MidInit' : new FormControl(null),
      'NameExtention' : new FormControl(null),
      'birthdate' : new FormControl(null),
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
      'TelNo' : new FormControl(null),
      'MobileNo' : new FormControl(null)

    })




    if(this.mode === 'edit'){

      //get user 

      this.userService.getUser(this.id)
      .subscribe(
        res=>{

          this.isLoading=false;
          this.user = res;
          //patch value
          this.mainForm.patchValue({profilePic : this.user.profilePic});
          this.mainForm.patchValue({EmployeeNumber : this.user.EmployeeNumber});
          this.mainForm.patchValue({LastName : this.user.LastName});
          this.mainForm.patchValue({FirstName : this.user.FirstName});
          this.mainForm.patchValue({MidInit : this.user.MidInit});
          this.mainForm.patchValue({NameExtention : this.user.NameExtention});
          this.mainForm.patchValue({birthdate : this.user.birthdate});
          this.mainForm.patchValue({PlaceOfBirth : this.user.PlaceOfBirth});
          this.mainForm.patchValue({gender : this.user.gender});
          this.mainForm.patchValue({CivilStatus : this.user.CivilStatus});
          this.mainForm.patchValue({height : this.user.height});
          this.mainForm.patchValue({height : this.user.CivilStatus});
          this.mainForm.patchValue({weight : this.user.weight});
          this.mainForm.patchValue({BloodType : this.user.BloodType});
          this.mainForm.patchValue({gsis : this.user.gsis});
          this.mainForm.patchValue({pagibig : this.user.pagibig});
          this.mainForm.patchValue({philHealth : this.user.philHealth});
          this.mainForm.patchValue({sss : this.user.sss});
          this.mainForm.patchValue({tin : this.user.tin});

          this.mainForm.patchValue({r_zipCode : this.user.r_zipCode});
          this.mainForm.patchValue({r_lotNo : this.user.r_lotNo});
          this.mainForm.patchValue({r_street : this.user.r_street});
          this.mainForm.patchValue({r_village : this.user.r_village});
          this.mainForm.patchValue({r_brgy : this.user.r_brgy});
          this.mainForm.patchValue({r_city : this.user.r_city});
          this.mainForm.patchValue({r_province : this.user.r_province});
          this.mainForm.patchValue({p_zipCode : this.user.p_zipCode});
          this.mainForm.patchValue({p_LotNo : this.user.p_LotNo});
          this.mainForm.patchValue({p_street : this.user.p_street});
          this.mainForm.patchValue({p_village : this.user.p_village});
          this.mainForm.patchValue({p_brgy : this.user.p_brgy});
          this.mainForm.patchValue({p_city : this.user.p_city});
          this.mainForm.patchValue({p_province : this.user.p_province});
          this.mainForm.patchValue({email : this.user.email});
          this.mainForm.patchValue({altEmail : this.user.altEmail});
          this.mainForm.patchValue({TelNo : this.user.TelNo});
          this.mainForm.patchValue({MobileNo : this.user.MobileNo});

          this.fileTitleProfilePicPrev = this.user.profilePic;
          this.selectedBloodType = this.user.BloodType;
          this.selectedGender = this.user.gender;
          this.selectedCivilStatus = this.user.CivilStatus;

        }
      );
      




    }

 

}

    onNoClick(): void {
      this.dialogRef.close();
    }


    onSubmit(){



      //FORM IS VALID
      if(this.mode === 'edit'){

        this.isLoading = true;
        this.userService.updateUser(
          this.user._id,
          this.mainForm.value.profilePic,
         this.mainForm.value.EmployeeNumber,
         this.mainForm.value.LastName,
         this.mainForm.value.FirstName,
         this.mainForm.value.MI,
         this.mainForm.value.NameExtention,
         this.mainForm.value.birthdate,
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
         this.mainForm.value.p_LotNo,
         this.mainForm.value.p_street,
         this.mainForm.value.p_village,
         this.mainForm.value.p_brgy,
         this.mainForm.value.p_city,
         this.mainForm.value.p_province,
         this.mainForm.value.email,
         this.mainForm.value.altEmail,
         this.mainForm.value.TelNo,
         this.mainForm.value.MobileNo,
         this.mainForm.value.status,
         this.mainForm.value.role)
         
        .subscribe(
          response =>{
  
            window.alert("User edited!");
            this.isLoading = false;
            this.dialogRef.close('success');
          },
          error =>{
  
            window.alert(error);
            this.isLoading = false;
          }
        );

      }

      //if create new 

      else{

    //     this.isLoading = true;
    //     this.userService.createUserFromAdmin(this.form.value.__first_name,
    //     this.form.value.__last_name,
    //     this.selectedRole,
    //     this.form.value.__email,  
    //     this.form.value.__password, 
    //     this.form.value.__fileESig,
    //     this.form.value.__student_no,
    //     this.form.value.__course,
    //     this.form.value.__year,
    //     this.form.value.__section)
    // .subscribe(
    //   (response)=>{
    //     //success
    //     console.log(response);
    //     window.alert("Success!");
    //     this.isLoading = false;
    //     this.dialogRef.close('success');
    //   },
      
    //   (error) =>{

    //     //error
    //   window.alert(error);
    //   this.isLoading = false;
    //   this.dialogRef.close('failed');

    // });

      }

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
