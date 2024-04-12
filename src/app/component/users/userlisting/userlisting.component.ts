import { Component, OnInit, OutputEmitterRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdduserComponent } from '../adduser/adduser.component';
import { Users } from '../../../shared/modles/users-model';
import { getuser, loaduser, openPopupUser } from '../../../core/Stores/Users/User.Action';
import { getuserlist } from '../../../core/Stores/Users/User.Selectors';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrl: './userlisting.component.scss'
})
export class UserlistingComponent  implements OnInit {

  UserList!:Users[];
  
  datasource:any;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  displayedColumns: string[] = [
    "id", "firstName",  "email", "mobilenumber","isActive", "action"
  ]
  constructor(private dialog:MatDialog,  private store: Store){

  }
  ngOnInit(): void {
    this.store.dispatch(loaduser());
    this.store.select(getuserlist).subscribe(data=>{
      this.UserList = data;
      this.datasource = new MatTableDataSource<Users>(this.UserList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort =this.sort;      
    })
  }

  getName(data:Users): string{
    const middleInitial = data.middleName ? `${data.middleName}`.charAt(0).toUpperCase() +'.': '';
    return `${data.firstName} ${middleInitial} ${data.lastName}`;
  }

  getStatusIcon(isActive: boolean): string{
    return isActive ? 'check_circle' : 'remove_circle';
  }


  addCustomer(){
    this.OpenAddUser(0, 'Add New User');
  }

  editCustomer(code:number){
    this.OpenAddUser(code, 'Update User');
    console.log(code);
    this.store.dispatch(getuser({id:code}))
  }

  OpenAddUser(code: number, title: string){
    this.store.dispatch(openPopupUser());
    this.dialog.open(AdduserComponent, {
      width: '60%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data:{
        id:code,
        title:title
      }

    })

  }
}
