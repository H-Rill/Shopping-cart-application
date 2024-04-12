import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { CustomerCred, CustomerInfo, Customers, ForgotPasswordFormData } from '../../shared/cutomer-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient : HttpClient) { }

  private apiUrl='http://localhost:3000/users'

  customerLogin(customerData: CustomerCred ): Observable<CustomerInfo[]>{
    return this.httpClient.get<CustomerInfo[]>(`${this.apiUrl}?username=${customerData.username}&password=${customerData.password}`);
  }

  forgotPassword(formData: ForgotPasswordFormData): Observable<CustomerInfo[]> {
    console.log('service')
    const { username, email, mobileNumber } = formData;
    const url = `${this.apiUrl}?username=${username}&email=${email}&mobilenumber=${mobileNumber}`;
    return this.httpClient.get<CustomerInfo[]>(url).pipe(
      catchError(error => {
        console.error('Failed to retrieve password:', error);
        return []; 
      })
    );
  }

  getAllCustomers(): Observable<Customers[]> {
    return this.httpClient.get<Customers[]>(this.apiUrl);
  }

  setCustomerToLocalStorage(userdata: CustomerInfo) {
    localStorage.setItem('userdata', JSON.stringify(userdata))
  }

  updateCustomerProfile(updatedProfile: Partial<CustomerInfo>): Observable<CustomerInfo> {
    if (updatedProfile.id === undefined) {
      throw new Error('User ID is required for updating profile');
    }
    const url = `${this.apiUrl}/${updatedProfile.id}`; 
    return this.httpClient.put<CustomerInfo>(url, updatedProfile as CustomerInfo).pipe(
      catchError(error => {
        console.error('Failed to update user profile:', error);
        throw error; 
      })
    );
  }

  getCustomerFromLocalStorage() {
    let _obj: CustomerInfo = {
      id: 0,
      username: '',
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      birthdate: '',
      interests: [],
      isActive: false,
      role: '',
      mobilenumber: '',
      dateCreated: '',
      dateUpdated: ''
    }
    if (localStorage.getItem('userdata') != null) {
      let jsonstring = localStorage.getItem('userdata') as string;
      _obj = JSON.parse(jsonstring);
      return _obj;
    } else {
      return _obj;
    }

  }

}
