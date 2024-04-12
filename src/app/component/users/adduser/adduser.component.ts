import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { UserService } from '../../../core/services/user.service';
import { getSelectUser, isDuplicateUser } from '../../../core/Stores/Users/User.Selectors';
import { Users } from '../../../shared/modles/users-model';
import { adduser, duplicateUser, updateuser } from '../../../core/Stores/Users/User.Action';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.scss'
})


export class AdduserComponent implements OnInit {
  hide = true;
  title ="Add New User";
  dialogdata:any;
  roleOptions = roleOptions;
  nextId: number = 0;

  

  constructor(private formBuilder: FormBuilder, private ref:MatDialogRef<AdduserComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any, private store:Store,
    private userService: UserService){}

    ngOnInit(): void {
      this.dialogdata = this.data;
      this.title = this.dialogdata.title;
      this.store.select(getSelectUser).subscribe(res => {
        const birthdate = new Date(res.birthdate);
        this.usersForm.setValue({
          id: res.id,
          firstName: res.firstName,
          middleName: res.middleName,
          lastName: res.lastName,
          password: res.password,
          username: res.username,
          email: res.email,
          birthdate: birthdate,
          mobilenumber: res.mobilenumber,
          role: res.role,
          isActive: res.isActive,
        });
      });
  
      this.userService.getAll().subscribe(users => {
        const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);
        this.nextId = maxId + 1;
      });
    }


  SaveUsers(){
    if(this.usersForm.valid){
      
      const userData: Users = this.usersForm.value;
      if(userData.id === 0){
        this.usersForm.patchValue({ id: this.getNextId().toString() });
        this.store.dispatch(adduser({ inputdata: userData }))
     
      } else {
        this.store.dispatch(updateuser({ inputdata: userData }))
      }

      this.ClosePopup();
    }
  }

  ClosePopup(){
    this.ref.close();
  }



  // public getUserForm(): FormGroup{
  //   return this.usersForm;
  // }


 
  public usersForm : FormGroup = this.formBuilder.group(
    {
      id: this.formBuilder.control(0),
      firstName: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')])),
      middleName:this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')])),
      lastName:this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')])),
      password:this.formBuilder.control('', Validators.compose([Validators.required,  Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')])),
      username:this.formBuilder.control('', Validators.required),
      email:this.formBuilder.control('', Validators.compose([Validators.required, Validators.email])),
      birthdate: this.formBuilder.control(new Date(), Validators.required),
      // interests:this.formBuilder.control([]),
      mobilenumber:this.formBuilder.control('', Validators.compose([Validators.required,  Validators.pattern("^9[0-9]{9}$")])),
      role:this.formBuilder.control('', Validators.required),
      isActive:this.formBuilder.control(true, Validators.required)
    }
  ) 

  getPasswordErrorMessage(): string {
    const passwordControl = this.usersForm.get('password');
    if (passwordControl?.touched && !passwordControl?.value) {
      return 'Password must not be empty';
    } else if (passwordControl?.touched && passwordControl?.value && passwordControl?.invalid) {
      return 'Password must be a combination of lower-case, upper-case, numbers and at least 9 characters long';
    }
    return '';
  }

  getfirstNameErrorMessage(): string {
    const firstNameControl = this.usersForm.get('firstName');
    if (firstNameControl?.touched && !firstNameControl?.value) {
      return 'Firstname must not be empty';
    } else if (firstNameControl?.touched && firstNameControl?.value && firstNameControl?.invalid) {
      return 'Firstname must not have numbers or special characters';
    }
    return '';
  }

  getmiddleNameErrorMessage(): string {
    const middleNameControl = this.usersForm.get('middleName');
    if (middleNameControl?.touched && !middleNameControl?.value) {
      return 'Middlename must not be empty';
    } else if (middleNameControl?.touched && middleNameControl?.value && middleNameControl?.invalid) {
      return 'Middlename must not have numbers or special characters';
    }
    return '';
  }
  getlastNameErrorMessage(): string {
    const lastNameControl = this.usersForm.get('lastName');
    if (lastNameControl?.touched && !lastNameControl?.value) {
      return 'Lastname must not be empty';
    } else if (lastNameControl?.touched && lastNameControl?.value && lastNameControl?.invalid) {
      return 'Lastname must not have numbers or special characters';
    }
    return '';
  }
  
  getmobileErrorMessage(): string{
    const mobilenumberControl = this.usersForm.get('mobilenumber');
    if (mobilenumberControl?.touched && mobilenumberControl.hasError('required')) {
      return 'Please enter mobile number';
    } else if (mobilenumberControl?.touched && mobilenumberControl.hasError('pattern')) {
      return 'Mobile number is not 10 digits';
    }
    return '';
  }

  getemailMessage(): string{
    const emailControl = this.usersForm.get('email');
    if (emailControl?.touched && emailControl.hasError('required')) {
      return 'Email address must not be empty';
    } else if (emailControl?.touched && emailControl.hasError('email')) {
      return 'Invalid email address format';
    }
    return '';
  }



  getNextId(): number {
    return this.nextId = 0 ? 0 : ++this.nextId;

  }
  

  isDuplicateUser(){
    const username= this.usersForm.value.username as string;
    if(username!=''){
      this.store.dispatch(duplicateUser({username:username}));
      this.store.select(isDuplicateUser).subscribe(item =>{
        const isexist = item;
        if(isexist){
          this.usersForm.controls['username'].reset()
        }
      })
    }
  }
  

}

export const roleOptions: { value: string, viewValue: string }[] = [
  { value: 'admin', viewValue: 'Admin' },
  { value: 'admin-user', viewValue: 'Admin-User' },
];