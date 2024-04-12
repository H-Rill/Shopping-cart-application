import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrl: './acknowledgement.component.scss'
})
export class AcknowledgementComponent {
  password!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.password = localStorage.getItem('password') ?? ''; 
  }

  proceedToLogin(): void {
    this.router.navigate(['/login']);
  }
}
