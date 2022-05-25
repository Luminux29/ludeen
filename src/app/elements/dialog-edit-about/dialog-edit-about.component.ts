import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { About } from 'src/app/models/about';
import { AboutService } from 'src/app/service/about.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-edit-about',
  templateUrl: './dialog-edit-about.component.html',
  styleUrls: ['./dialog-edit-about.component.css']
})
export class DialogEditAboutComponent implements OnInit {

  
  about: any;
  form: FormGroup;
  isLoading = false;
  fileTitlePrev: string;
  fileTitle:string;
  id : string;
  constructor(private aboutService: AboutService,
    public dialogRef: MatDialogRef<DialogEditAboutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    this.form = new FormGroup({

      'vision' : new FormControl(null, {validators: [Validators.required]}),
      'mission' : new FormControl(null,  {validators:[Validators.required]}),
      'logo' : new FormControl(null, {validators:[Validators.required]}),


    });

    this.isLoading = true;
    //get data
    this.aboutService.getAbout();
    this.aboutService.getAboutUpdatedListener()
    .subscribe(res=>{
      this.isLoading = false;
      this.about = res.about[0];
      this.form.patchValue({vision : this.about.vision});
      this.form.patchValue({mission : this.about.mission});
      this.form.patchValue({logo : this.about.logo});

      this.id = this.about._id;
      this.fileTitlePrev = this.about.logo;


    }, err=>{
      this.isLoading = false;
      console.log(err);

    });


  }

  onEdit(){

    this.isLoading=true;
    this.aboutService.updateAbout(this.id,
      this.form.value.vision,
      this.form.value.mission,
      this.form.value.logo
    )
    .subscribe(res=>{
      
      this.isLoading = false;
      Swal.fire({
        icon: 'success',
        title: 'Yehey!',
        text: 'Updated successfully!',
        allowOutsideClick: false
    
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = false;
          this.dialogRef.close('success');
        }
      });

      

    },err=>{
      this.dialogRef.close();
      console.log(err);


    })



  }
  onNoClick(){

    this.dialogRef.close();

  }

  onFilePicked(event: Event){

    const file = (event.target as HTMLInputElement).files[0];
    this.fileTitle = file.name;
    console.log();
    this.form.patchValue({logo: file});
    this.form.get('logo').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () =>{
      this.fileTitlePrev = reader.result as string;
  }
    reader.readAsDataURL(file);

  }

}
