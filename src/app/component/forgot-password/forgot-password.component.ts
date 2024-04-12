import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { forgotPassword } from '../../core/Stores/Customers/Customer.Action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const formData = this.forgotPasswordForm.value;
      this.store.dispatch(forgotPassword({ formData }));
      // console.log(formData);
    }
    
  }

  cancelAction(){
    this.forgotPasswordForm.reset()
    this.router.navigate(['/login'])

  }

  getemailMessage(): string{
    const emailControl = this.forgotPasswordForm.get('email');
    if (emailControl?.touched && emailControl.hasError('required')) {
      return 'Email address must not be empty';
    } else if (emailControl?.touched && emailControl.hasError('email')) {
      return 'Invalid email address format';
    }
    return '';
  }
}
