import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee-model';
import { Login } from '../models/login-modeel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUser(value: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }

  login(log:Login):Observable<boolean>{
    return this.http.post<{token:string}>(environment.API_URL+'Employees/login',log)
    .pipe(
      map(result=>{
        localStorage.setItem('access_token',result.token);
          return true;
      })
    );
  }
  logout(){
    localStorage.removeItem('access_token')
  }
  public get loggedIn(): boolean{
    return (localStorage.getItem('access_token') !== null);
  }
}
