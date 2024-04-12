import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Usercred, Userinfo, Users } from '../../shared/modles/users-model';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl='http://localhost:3000/users'

  constructor(private httpClient:HttpClient) { }

  getAll(){
    return this.httpClient.get<Users[]>(this.apiUrl)
  }
  
  userLogin(userdata: Usercred){
    return this.httpClient.get<Userinfo[]>(`${this.apiUrl}?username=${userdata.username}&password=${userdata.password}`);
  }

  duplicateUsername(username: string){
    return this.httpClient.get<Userinfo[]>(`${this.apiUrl}?username=${username}`);
  }


  getById(code:number){
    console.log('Fetching user data for ID user service:', code);
    return this.httpClient.get<Users>(`${this.apiUrl}/${code}`)
  }
  getUserByUsername(username: string): Observable<Users> {
    return this.httpClient.get<Users>(`${this.apiUrl}?username=${username}`);
  }

  createUser(data:Users){
    return this.httpClient.post(`${this.apiUrl}`,data)
  }

  updateUser(data:Users){
    return this.httpClient.put(`${this.apiUrl}/${data.id}`, data)
  }

  setUserToLocalStorage(userdata: Userinfo) {
    localStorage.setItem('userdata', JSON.stringify(userdata))
  }

  getuserdatafromstorage() {
    let _obj: Userinfo = {
      id: 0,
      username: '',
      email: '',
      name: '',
      role: '',
      isActive: false
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
