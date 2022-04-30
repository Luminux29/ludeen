import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAccountComponent } from 'src/app/elements/add-account/add-account.component';
import { DialogAddCivilComponent } from 'src/app/elements/dialog-add-civil/dialog-add-civil.component';
import { DialogAddSchoolComponent } from 'src/app/elements/dialog-add-school/dialog-add-school.component';
import { DialogAddTrainingComponent } from 'src/app/elements/dialog-add-training/dialog-add-training.component';
import { DialogAddWorkComponent } from 'src/app/elements/dialog-add-work/dialog-add-work.component';
import { UserService } from 'src/app/service/user.service';
import { PDFDocument, StandardFonts, rgb, PDFFont } from 'pdf-lib'
import { Font, FontNames, Encodings } from '@pdf-lib/standard-fonts';
import { User } from 'src/app/models/user';
import { SchoolService } from 'src/app/service/school.service';
import { School } from 'src/app/models/school';
import {saveAs} from 'file-saver';
import { CivilService } from 'src/app/service/civil.service';
import { Civil } from 'src/app/models/civil';
@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {


  showFiller = false;
  profilePicPath : string;
  faculty : any;
  isLoading = false;
  name:string;
  id:string;
  age:string;
  schools : School [] =[];
  civils: Civil[]=[];

  constructor(private userService: UserService,
    private dialog : MatDialog, 
    private schoolService: SchoolService,
    private civilService: CivilService) { }

  ngOnInit(): void {

    //set loading to true so it wont show stuffs if data isnt ready yet
    this.isLoading=true;

    //get user id for reference
    this.id = this.userService.getUserId();

    //get user information
    this.userService.getUser(this.id)
    .subscribe(res=>{

      this.faculty = res;

      this.name = this.faculty.LastName + ", "+this.faculty.FirstName+ " "+ this.emptyStringIfNull(this.faculty.NameExtention) + " " + this.emptyStringIfNull(this.faculty.MI); 
      this.profilePicPath = this.faculty.profilePic;

      //get user's school information
      this.schoolService.getSchoolByUserId(this.userService.getUserId())
      .subscribe(res=>{

        let mySchools = res['schools'];

        //push schools according to type 
        for(let i = 0; i < mySchools.length; i++){

          if(mySchools[i].type === 'Elementary' ){

              this.schools.push(mySchools[i]);

          }

        }

        for(let i = 0; i < mySchools.length; i++){

          if(mySchools[i].type === 'Secondary' ){

              this.schools.push(mySchools[i]);

          }

        }

        for(let i = 0; i < mySchools.length; i++){

          if(mySchools[i].type === 'Vocational' ){

              this.schools.push(mySchools[i]);

          }

        }

        
        for(let i = 0; i < mySchools.length; i++){

          if(mySchools[i].type === 'College' ){

              this.schools.push(mySchools[i]);

          }

        }

        for(let i = 0; i < mySchools.length; i++){

          if(mySchools[i].type === 'Graduate Studies' ){

              this.schools.push(mySchools[i]);

          }

        }


        //get civil service information
        this.civilService.getCivilByUserId(this.userService.getUserId())
        .subscribe(res=>{

          this.civils = res['civils'];

        },
        err=>{

          console.log(err);
          window.alert("Error");
        })


        this.isLoading=false;
      })
      

    })


  }

  async printPDF(){

  //load Personal Form
    const personalFormUrl = 'assets/files/Personal_Info_Form.pdf';
    const personalFormPdfBytes = await fetch(personalFormUrl).then(res => res.arrayBuffer());
    const personalDoc = await PDFDocument.load(personalFormPdfBytes);

  //load profile pic
    const pfpBytes = await fetch(this.faculty.profilePic).then(res => res.arrayBuffer())
    const pfpImage = await personalDoc.embedPng(pfpBytes)

  //get personal info form
  const form = personalDoc.getForm()

  //get bold font
  const fontBold = await personalDoc.embedFont(StandardFonts.HelveticaBold)

 
  //get fields
  const pfpField = form.getButton('pfp')
  const nameField = form.getTextField('Name')
  const empField = form.getTextField('emp_number')
  const bdayField = form.getTextField('bday')
  const ageField = form.getTextField('age')
  const placeBirthField = form.getTextField('place_of_birth')
  const sexField = form.getTextField('sex')
  const civilField = form.getTextField('civil_status')
  const heightField = form.getTextField('height')
  const weightField = form.getTextField('weight')
  const bloodField = form.getTextField('bloodtype')
  const citizenshipField = form.getTextField('citizenship')

  const gsisField = form.getTextField('gsis')
  const pagibigField = form.getTextField('pagibig')
  const philhealthField = form.getTextField('philhealth')
  const sssField = form.getTextField('sss')
  const tinField = form.getTextField('tin')

  const r_houseField = form.getTextField('house_no')
  const r_streetField = form.getTextField('street')
  const r_subField = form.getTextField('sub')
  const r_brgyField = form.getTextField('brgy')
  const r_cityField = form.getTextField('city')
  const r_provinceField = form.getTextField('province')
  const r_zipField = form.getTextField('zip')

  const p_houseField = form.getTextField('house_no2')
  const p_streetField = form.getTextField('street2')
  const p_subField = form.getTextField('sub2')
  const p_brgyField = form.getTextField('brgy2')
  const p_cityField = form.getTextField('city2')
  const p_provinceField = form.getTextField('province2')
  const p_zipField = form.getTextField('zip2')

  const emailField = form.getTextField('Email')
  const altEmailField = form.getTextField('Alternate Email')
  const telNoField = form.getTextField('Tel no')
  const mobileNoField = form.getTextField('Mobile no')


  //fill up form
  pfpField.setImage(pfpImage);
  nameField.setText(this.faculty.FirstName+ " " + this.emptyStringIfNull(this.faculty.MI) + " " + this.faculty.LastName  + " " + this.emptyStringIfNull(this.faculty.NameExtention));
  nameField.updateAppearances(fontBold);
  empField.setText(this.noAssignmentStringIfNull(this.faculty.EmployeeNumber));
  bdayField.setText(this.noAssignmentStringIfNull(this.readableDate(this.faculty.birthdate)));
  ageField.setText(this.getAge(this.faculty.birthdate).toString());
  placeBirthField.setText(this.noAssignmentStringIfNull(this.faculty.PlaceOfBirth));
  sexField.setText(this.noAssignmentStringIfNull(this.faculty.gender));
  civilField.setText(this.noAssignmentStringIfNull(this.faculty.CivilStatus));
  heightField.setText(this.noAssignmentStringIfNull(this.faculty.height));
  weightField.setText(this.noAssignmentStringIfNull(this.faculty.weight));
  bloodField.setText(this.noAssignmentStringIfNull(this.faculty.BloodType));
  citizenshipField.setText(this.noAssignmentStringIfNull(this.faculty.citizenship));

  gsisField.setText(this.noAssignmentStringIfNull(this.faculty.gsis));
  pagibigField.setText(this.noAssignmentStringIfNull(this.faculty.pagibig));
  philhealthField.setText(this.noAssignmentStringIfNull(this.faculty.philHealth));
  sssField.setText(this.noAssignmentStringIfNull(this.faculty.sss));
  tinField.setText(this.noAssignmentStringIfNull(this.faculty.tin));

  r_houseField.setText(this.noAssignmentStringIfNull(this.faculty.r_lotNo));
  r_streetField.setText(this.noAssignmentStringIfNull(this.faculty.r_street));
  r_subField.setText(this.noAssignmentStringIfNull(this.faculty.r_village));
  r_brgyField.setText(this.noAssignmentStringIfNull(this.faculty.r_brgy));
  r_cityField.setText(this.noAssignmentStringIfNull(this.faculty.r_city));
  r_provinceField.setText(this.noAssignmentStringIfNull(this.faculty.r_province));
  r_zipField.setText(this.noAssignmentStringIfNull(this.faculty.r_zipCode));

  p_houseField.setText(this.noAssignmentStringIfNull(this.faculty.p_LotNo));
  p_streetField.setText(this.noAssignmentStringIfNull(this.faculty.p_street));
  p_subField.setText(this.noAssignmentStringIfNull(this.faculty.p_village));
  p_brgyField.setText(this.noAssignmentStringIfNull(this.faculty.p_brgy));
  p_cityField.setText(this.noAssignmentStringIfNull(this.faculty.p_city));
  p_provinceField.setText(this.noAssignmentStringIfNull(this.faculty.p_province));
  p_zipField.setText(this.noAssignmentStringIfNull(this.faculty.p_zipCode));

  emailField.setText(this.noAssignmentStringIfNull(this.faculty.email));
  altEmailField.setText(this.noAssignmentStringIfNull(this.faculty.altEmail));
  telNoField.setText(this.noAssignmentStringIfNull(this.faculty.TelNo));
  mobileNoField.setText(this.noAssignmentStringIfNull(this.faculty.MobileNo));

  //set all fields to BOLD
  const fields = form.getFields();
  fields.forEach((field) => {
    const type = field.constructor.name;
    const name = field.getName();
    if (type === "PDFTextField"){
    form.getTextField(name).updateAppearances(fontBold);
    }
  })

  //flatten form so it wont be editable
  form.flatten();


  //create main document 
  const pdfDoc = await PDFDocument.create();

  //copy created form to main document 
  const [existingPage1] = await pdfDoc.copyPages(personalDoc, [0])
  const [existingPage2] = await pdfDoc.copyPages(personalDoc, [1])


  //load Educational Background Form Url
  pdfDoc.addPage(existingPage1)
  pdfDoc.addPage(existingPage2)

  //if there are education entry, proceed
  if(this.schools.length > 0){

    //loop education entry
    for(let i = 0; i < this.schools.length; i++){
      
      //load educational from pdf from assets/files folder
      const educationalFormUrl = 'assets/files/Educational_Background_Form.pdf';
      const educationFormPdfBytes = await fetch(educationalFormUrl).then(res => res.arrayBuffer());
      const educationDoc = await PDFDocument.load(educationFormPdfBytes);
      
      
      //get form
      const educForm = educationDoc.getForm();

      //get form fields
      const typeField = educForm.getTextField('type');
      const nameField = educForm.getTextField('name_of_school');
      const degreeField = educForm.getTextField('degree');
      const fromField = educForm.getTextField('from');
      const toField = educForm.getTextField('to');
      const unitsField = educForm.getTextField('units');
      const yearGraduatedField = educForm.getTextField('year_graduated');
      const awardField = educForm.getTextField('award');


      //set form fields
      typeField.setText(this.schools[i].type);
      nameField.setText(this.noAssignmentStringIfNull(this.schools[i].nameOfSchool));
      degreeField.setText(this.noAssignmentStringIfNull(this.schools[i].course));
      fromField.setText(this.noAssignmentStringIfNull(this.schools[i].fromYear));
      toField.setText(this.noAssignmentStringIfNull(this.schools[i].toYear));
      unitsField.setText(this.noAssignmentStringIfNull(this.schools[i].highestLevel));
      yearGraduatedField.setText(this.noAssignmentStringIfNull(this.schools[i].yearGraduated));
      awardField.setText(this.noAssignmentStringIfNull(this.schools[i].honors));


      //set form field's font to bold
      const fields = educForm.getFields();
      fields.forEach((field) => {
        const type = field.constructor.name;
        const name = field.getName();
        if (type === "PDFTextField"){
        educForm.getTextField(name).updateAppearances(fontBold);
      }
    })

    //flatten form
      educForm.flatten();

    //add education form to main document 
    const [educPage] = await pdfDoc.copyPages(educationDoc, [0]);
    pdfDoc.addPage(educPage)



    }
  }

  





  //create main pdf document and add personal form pdf pages
    //save
    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    //saveAs from file-saver
    saveAs(blob, 'My-Information.pdf');

    //eto default ng typescript ayaw gumana minsan
    const url= window.URL.createObjectURL(blob);
    window.open(url);

  }

  readableDate(date : Date){


    return new Date(date).toLocaleDateString();;

  }

  noAssignmentStringIfNull(name:any){

    if (name === undefined || name === null || name === '' || name === 'null') {

     return "N/A";
     }
    else{
      return name;
    }

  }

  emptyStringIfNull(name:any){

    if (name === undefined || name === null || name === '' || name === 'null') {

     return "";
     }
    else{
      return name;
    }

  }

  openAddSchoolDialog(){

    const dialogRef = this.dialog.open(DialogAddSchoolComponent, {
     data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      //after closing dialog, refresh the table
      if(result){

        window.location.reload();


      }
    });


  }

  
  openAddWorkDialog(){

    const dialogRef = this.dialog.open(DialogAddWorkComponent, {
     data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      //after closing dialog, refresh the table
      if(result){

        window.location.reload();


      }
    });


  }

  openAddTrainingDialog(){

    const dialogRef = this.dialog.open(DialogAddTrainingComponent, {
      data: null
     });
 
     dialogRef.afterClosed().subscribe(result => {
       //after closing dialog, refresh the table
       if(result){
 
         window.location.reload();
 
 
       }
     });

  }


  openAddCivilDialog(){

    const dialogRef = this.dialog.open(DialogAddCivilComponent, {
      data: null
     });
 
     dialogRef.afterClosed().subscribe(result => {
       //after closing dialog, refresh the table
       if(result){
 
         window.location.reload();
 
 
       }
     });

  }

  getAge(bday: Date){

    let timeDiff = Math.abs(Date.now() - new Date(bday).getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    return age;

  }

  onEditDialog(id : string){

    const dialogRef = this.dialog.open(AddAccountComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      //after closing dialog, refresh the table
      if(result){

          window.location.reload();

      }
    });
  
  }

  // openAddSchoolDialog(){
  //   const dialogRef = this.dialog.open(DialogAddSchoolComponent, {
  //     data: this.userService.getUserId()
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     //after closing dialog, refresh the table

  //   });


  // }

  logout(){

    this.userService.logout();

  }
}
