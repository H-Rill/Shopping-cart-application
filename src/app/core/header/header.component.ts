import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  username: string | undefined;
  constructor (private router: Router){}

  ngOnInit(): void {
      const userDataString = localStorage.getItem('userdata');
      if(userDataString !==null  ){
        const userdata = JSON.parse(userDataString);
        if(userdata.role === 'admin'){
          this.username = 'Admin'
        } else{
          this.username = userdata.firstName + ' ' + userdata.lastName; 
        }
      } else {
        this.username = 'Default User'
      }
  }

  logout(): void{
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
