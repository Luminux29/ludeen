import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { PdfviewerComponent } from 'src/app/elements/pdfviewer/pdfviewer.component';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  //declare variables
  _filter :string = '';
  isLoading = false;
  public users : User[] = [];
  displayedColumns: string[] = [ 
  'EmployeeNumber', 
  'LastName', 
  'MI', 
  'FirstName', 
  'NameExtention', 
  'birthdate', 
  'PlaceOfBirth', 
  'gender',  
  'CivilStatus', 
  'height', 
  'weight', 
  'BloodType',
  'gsis',
  'pagibig',
  'philHealth',
  'sss',
  'tin',
  'citizenship',
  'r_zipCode',
  'p_zipCode', 
  'TelNo',
  'MobileNo',
  'email',
  'altEmail',
  'status',
  'role',
  'action'
];
  pageSizeOptions : number[];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private dialog : MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    this.refreshTable();
  }


  view(id:string){

    const dialogRef = this.dialog.open(PdfviewerComponent, {

      disableClose: false,
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      //after closing dialog, refresh the table
      this.refreshTable();
    });

  }

  showAll(){

    this._filter = "";
    this.refreshTable();
    this.paginator.pageSize = this.dataSource.data.length;


  }

  noAssignmentStringIfNull(name:any){

    if (name === undefined || name === null || name === '' || name === 'null' || name === 'undefined') {

     return "N/A";
     }
    else{
      return name.toString();;
    }

  }

  emptyStringIfNull(name:any) : string{

    if (name === undefined || name === null || name === '' || name === 'null') {

     return "";
     }
    else{
      return name.toString();
    }

  }

  logout(){

    let logout = window.confirm("Are you sure you want to logout?");
    if(logout){

      this.userService.logout();

    }

  }

  deleteUser(id : string){

    let willDelete = window.confirm('Are you sure you want to delete this user?');
    if(willDelete){

      this.userService.deleteUser(id)
      .subscribe(res=>{

        window.alert("Success!");
        this.refreshTable();

      },
      err =>{
        console.log(err);
        window.alert("Failed!");


      });

    }

  }



  applyFilter(event: Event){

    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  refreshTable(){

    this.isLoading = true;

    this.userService.getUsers();
    this.userService.geUsersUpdateListener()
    .subscribe((userData) => {
    
      this.isLoading = false;
      this.users = userData.users;
      this.dataSource = new MatTableDataSource(this.users);
      this.setPageSizeOption();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    
    },
    err =>{

      console.log(err);
    });
    
  }

  presentRequiredDate(date: Date) : string{
   
    if(date){

      return this.readableDate(date);

    }

    return "Present";


  }

  nullDateNotRequired(date: Date) :string{

    if(date){

      return this.readableDate(date);

    }

    return "N/A";

  }



  readableDate(date : any) : string{



      return new Date(date).toLocaleDateString();

 
  

  }

  
  setPageSizeOption(){

    if( this.dataSource.data.length > 10){
      this.pageSizeOptions =  [1, 2, 5,  10, this.dataSource.data.length];
    }
    else{
      this.pageSizeOptions =  [1, 2, 5, 10];
    }

    this.paginator.pageSize= this.dataSource.data.length;
  }

}
