import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatListModule} from "@angular/material/list";
import {UserService} from "../../../services/user.service";
import {MatButtonModule} from "@angular/material/button";
import {NgClass} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatListModule, MatButtonModule, NgClass, FormsModule, MatInputModule],
})


export class DashboardComponent implements  AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'has_device', 'action'];

  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchTerm: String = "";

  userStatus ={
    user_id: 0,
    active: false
  }



  constructor(private userService: UserService,
              private _snackBar: MatSnackBar) {
  }


  ngAfterViewInit() {
    this.userService.getAllUsers().subscribe((data: any)=>{
      this.dataSource = new MatTableDataSource<User>(data);
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Usuarios por página';
    })
  }
  search() {
    this.userService.searchUser(this.searchTerm).subscribe((data: any)=>{
      this.dataSource = new MatTableDataSource<User>(data);
    })
  }

  ChangeStatus(user_id: any, active:any) {
    this.userStatus.user_id = user_id;
    if(active){
      this.userStatus.active = false;
    }else{
      this.userStatus.active = true;
    }


    this.userService.changeStatus(this.userStatus).subscribe((data:any)=>{

        if(this.searchTerm != null){
          this.search();
        }else{
          this.ngAfterViewInit();
        }
      },
      (error:any)=>{
      this._snackBar.open("Hubo un error. Intente de nuevo.", undefined, { duration: 5 * 1000 });
    })
  }
}

export interface User {
  name: string;
  email: string;
  phone: string;
  active: boolean;
  hasDevice: boolean;
  user_id: number;
}




