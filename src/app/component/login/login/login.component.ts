import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usercred } from '../../../shared/modles/users-model';
import { Store } from '@ngrx/store';
import { beginLogin } from '../../../core/Stores/Users/User.Action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  hide = true;
  constructor(private builder: FormBuilder, private store: Store, private router: Router) {

  }

  ngOnInit(): void {
      localStorage.clear();
  }

  loginForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  })

  proceedLogin() {
    if (this.loginForm.valid) {
      const _obj: Usercred={
        username: this.loginForm.value.username as string,
        password: this.loginForm.value.password as string
      }
      this.store.dispatch(beginLogin({usercred : _obj}))
    }
  }

  resetLogin() {
    this.loginForm.reset();
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.touched && !passwordControl?.value) {
      return 'Password is required!';
    }
    return '';
  }
  
  navigateToForgotPassword() {
    this.router.navigate(['forgotPassword']);
  }
}
