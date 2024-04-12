import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { cursorTo } from 'readline';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss'
})
export class MenubarComponent implements DoCheck {
   isMenuVisible = false;
   username: string|undefined;
   userRole : string|undefined;
   constructor(private router: Router){

   }
   ngDoCheck(): void {
    const userDataString = localStorage.getItem('userdata');
    if(userDataString !==null  ){
      const userdata = JSON.parse(userDataString);
      if(userdata.role === 'admin'){
        this.username = 'Admin'
        this.userRole = userdata.role;
        this.isMenuVisible = true;
      } else{
        this.username = userdata.firstName + ' ' + userdata.lastName; 
        this.userRole = userdata.role;
        this.isMenuVisible = false;
      }
    } else {
      this.isMenuVisible = false;
    }

    // const currectRoute = this.router.url;
    // if(currectRoute==='/login'
    // ){
    //   this.isMenuVisible = false;
    // }   else{
    //   this.isMenuVisible = true;
    // }
   }

   logout(): void{
    localStorage.clear();
    this.userRole = '';
    this.router.navigate(['/login']);
  }
}
