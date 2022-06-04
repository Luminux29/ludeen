import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/app/service/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  vision: string;
  mission: string;
  logo: string;
  isLoading = false;
  constructor(private aboutService: AboutService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.aboutService.getAbout();
    this.aboutService.getAboutUpdatedListener()
    .subscribe(res=>{

      this.isLoading = false;
      this.vision  = res.about[0].vision;
      this.mission  = res.about[0].mission;
      this.logo  = res.about[0].logo;


    }, err=>{
      this.isLoading = false;
      
      console.log(err);
    })

    

  }

}
