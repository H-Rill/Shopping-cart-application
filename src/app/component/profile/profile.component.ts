import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { CustomerInfo } from '../../shared/cutomer-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  customerProfile: CustomerInfo = {
    id: 0,
    username: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    birthdate: '',
    interests: [],
    mobilenumber: '',
    role: '',
    isActive: false,
    dateCreated: '',
    dateUpdated: ''
  }; 
  editMode = false;
  editedInterests: string[] = [];
  newInterest = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerProfile = this.customerService.getCustomerFromLocalStorage() || {};
    console.log(this.customerProfile)
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode && this.editedInterests.length === 0) {
      // If edit mode is toggled on for the first time and editedInterests is empty,
      // initialize editedInterests with the existing interests
      this.editedInterests = [...this.customerProfile?.interests || []];
      this.newInterest = '';
    } else if (!this.editMode) {
      // If edit mode is toggled off, reset editedInterests and newInterest
      this.editedInterests = [];
      this.newInterest = '';
    }
  }
  cancelEdit(): void {
    console.log(this.editedInterests)
    this.editMode = false;
  }

  addInterest(): void {
    if (this.newInterest.trim() !== '') {
      this.editedInterests.push(this.newInterest.trim());
      this.newInterest = '';
    }
  }

  saveProfile(): void {
    // Check if new interests have been added
    if (this.newInterest.trim() !== '') {
      this.editedInterests.push(this.newInterest.trim());
      this.newInterest = ''; // Clear the new interest input
    }
  
    // Remove the time portion from the birthdate
    if (this.customerProfile.birthdate) {
      const birthdateDate = new Date(this.customerProfile.birthdate);
      this.customerProfile.birthdate = birthdateDate.toISOString().split('T')[0];
    }
  
    // Update profile data only if new interests were added
    if (this.editedInterests.length > 0) {
      const updatedProfile = { ...this.customerProfile, interests: this.editedInterests };
      // Send updated profile data to the server
      this.customerService.updateCustomerProfile(updatedProfile).subscribe(
        (data: CustomerInfo) => {
          if (data) {
            this.customerProfile = data;
            this.editMode = false;
            this.customerService.setCustomerToLocalStorage(data);
            console.log(localStorage.getItem('userdata'));
          }
        },
        (error) => {
          console.error('Error updating user profile:', error);
        }
      );
    } else {
      // No new interests were added, simply exit edit mode
      this.editMode = false;
    }
  }
}
