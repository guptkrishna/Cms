import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserModel } from 'src/app/models/user-model';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  signUpFrom!: FormGroup;
  

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.signUpFrom = this.fb.group({
      fullName: ["", Validators.required],
      mobile: ["", Validators.required],
      userName: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.required],
      userType: ["", Validators.required]

    })
  }
  // signUp() {
  //   let signupObj =new UserModel();
  //   signupObj.fullName = this.signUpFrom.value.fullName;
  //   signupObj.mobile = this.signUpFrom.value.mobile;
  //   signupObj.userName = this.signUpFrom.value.userName;
  //   signupObj.password = this.signUpFrom.value.password;
  //   signupObj.userType = this.signUpFrom.value.userType;
  //   this.employeeService.signup(UserModel)
  //     .subscribe({
  //       next:(res)=>{
  //         alert("signUp successfully");
  //           this.signUpFrom.reset();
  //           this.router.navigate(['login']);
  //       },
  //       error: () => {
  //         alert("Error while addeding employee");
  //       }
  //     })


  // }

}
