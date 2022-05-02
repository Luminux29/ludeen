import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {

  hide = true;
  fileTitleProfilePic: string;
  fileTitleProfilePicPrev: string;
  mainForm : FormGroup;
  fileTitleESig:string;
  imagePreviewESig: string;
  isLoading = false;



  constructor(private userService: UserService, private router: Router) { }

  
  ngOnInit(): void {

    this.mainForm = new FormGroup({

      'ProfilePic': new FormControl(null,{validators: [Validators.required]}),
      'LastName' : new FormControl(null, {validators: [Validators.required]}),
      'FirstName' : new FormControl(null, {validators: [Validators.required]}),
      'Email' : new FormControl(null),
      'Password' : new FormControl(null),
      'ConfirmPassword' : new FormControl(null)

   
    })



  }

  onRegister(){
    
    
    if(this.mainForm.invalid){
      console.log(this.findInvalidControls());
      window.alert("Complete all fields" );
      return;
    }
    
    if(!this.checkPasswordIfSame(this.mainForm.value.Password, this.mainForm.value.ConfirmPassword)){

      window.alert('Make sure your password and confirm password is the same!');

    }

    let passcode = prompt("Please enter the admin creation passcode");

    if(passcode === this.userService.getPassCode()){

      this.userService.createAdmin(
        this.mainForm.value.FirstName,
        this.mainForm.value.LastName,
        this.mainForm.value.Email,
        this.mainForm.value.Password,
        this.mainForm.value.ProfilePic
  
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
    else {
      window.alert('Wrong passcode!');
      return;

    }



  }

  
  onFilePickedProfilePic(event: Event){

    const file = (event.target as HTMLInputElement).files[0];
    this.fileTitleProfilePic = file.name;
    this.mainForm.patchValue({ProfilePic: file});
    this.mainForm.get('ProfilePic').updateValueAndValidity();
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

  checkPasswordIfSame(pass: string, c_pass: string){

    if(pass === c_pass){
      return true;

      
    }
    else{

      return false;

    }
  }

  

}
