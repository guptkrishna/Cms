import { HttpClient ,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee, EmployeeUpdate } from '../models/employee-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employee!: Employee;

  constructor(private http: HttpClient) {}

  postEmployee(emp: Employee) {
    return this.http.post(environment.API_URL + 'Employees', emp);
  }

  getEmployee() {
    // let params1 = new HttpParams().set('PageNumber',"1");
    // let params2 = new HttpParams().set('PageSize', "10");
    return this.http.get<any>(environment.API_URL + 'Employees' );
  }
  getcompany():any{
    return this.http.get<any>(environment.API_URL+'Company')
  }

  putEmployee(emp: EmployeeUpdate) {
    return this.http.put(environment.API_URL + 'Employees/' + emp.id, emp );
  }

  deleteEmployee(id: number) {
    return this.http.delete(environment.API_URL + 'Employees/' + id )
  }
  login(employeePortalUserName:string,password:string){
    return this.http.post<any>(environment.API_URL+'Employees/login',{employeePortalUserName,password})
  }


}
