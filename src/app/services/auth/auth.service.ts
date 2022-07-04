import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee-model';
import { environment } from 'src/environments/environment';
import { EmployeeService } from '../employee.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
  // isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private employeeService:EmployeeService,private http:HttpClient) {
      // const token = localStorage.getItem('profanis auth');
      // this._isLoggedIn$.next(!!token);
     }

  // login(employeePortalUserName:string, password:string){
  //   return this.employeeService.login(employeePortalUserName,password).pipe(
  //     tap((res:any)=>{
  //       this._isLoggedIn$.next(true);
  //       localStorage.setItem('profanis auth',res.token)
  //       // console.log(res.token);
        
  //     })
  //   );
  // }
  login(employeePortalUserName:string,password:string){
    return this.http.post<any>(environment.API_URL+'Employees/login',{employeePortalUserName,password}).shareReplay();

  }
 
}


