import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { About } from 'src/app/models/about';
import { AboutService } from 'src/app/service/about.service';

@Component({
  selector: 'app-admin-about',
  templateUrl: './admin-about.component.html',
  styleUrls: ['./admin-about.component.css']
})
export class AdminAboutComponent implements OnInit {

  about: About;
  form: FormGroup;
  isLoading = false;
  fileTitlePrev: string;
  fileTitle:string;
  constructor(private aboutService: AboutService) { }

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
      this.fileTitlePrev = this.about.logo;


    }, err=>{
      this.isLoading = false;
      console.log(err);

    });

 

  }

  onEdit(){


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
