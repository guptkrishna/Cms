import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup,FormBuilder,Validators, FormControl, NgForm } from '@angular/forms';
import { Employee,EmployeeUpdate } from 'src/app/models/employee-model';
import { EmployeeService } from 'src/app/services/employee.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Login } from 'src/app/models/login-modeel';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent  {
  loginFrom!:FormGroup;
  alertify: any;
  // public employeePortalUserName!:string ;
  // public password!: string;
  
  
  // loginFrom = new FormGroup({ 
  //       employeePortalUserName: new FormControl('', [Validators.required]),
  //       password:new FormControl('',[Validators.required])
  //     });
  

  constructor(private fb:FormBuilder,private employeeService:EmployeeService,
    private router:Router, private auth:AuthService) 
  { }


  ngOnInit(): void {
    this.loginFrom = this.fb.group({
      employeePortalUserName: new FormControl('', [Validators.required]),
      password:new FormControl('',[Validators.required]),
    }
    );
  }

  // onLogin(loginFrom: NgForm){
  //   console.log(loginFrom.value);
  //   const login = this.auth.authUser(loginFrom.value);
  //   if (login){
  //     localStorage.setItem('login', login.employeePortalUserName);
  //      this.alertify.success('Login Successful');
  //      this.router.navigate(['login'])
  //   }
  //   else {
  //       this.alertify.error('Login not Successful');
  //   }
  //}

  // submitForm(){
  //   let employee = new Employee();
  //   employee.employeePortalUserName = this.loginFrom.value.employeePortalUserName;
  //   employee.password = this.loginFrom.value.password;
  //   this.employeeService.login(employee).subscribe({
  //     next:(res)=>{
  //       console.log(res);
  //       alert("Login successFully");
  //       this.loginFrom.reset();
  //       this.router.navigate(['/navbar'])
  //     },
  //     error: () => {
  //       alert("Error while addeding employee");
  //     }
  //   });
  // }

   submit(){
    let login = new Login();
    login.employeePortalUserName = this.loginFrom.value.employeePortalUserName;
    login.password = this.loginFrom.value.password;
    this.auth.login(login)
    .pipe(first())
    .subscribe({next:(res)=>{
      alert("Login successFully")
      this.router.navigate(['/home'])
    }
      
    }
      
      
    );
    
  
  }
  





  ///////////by video

  // submitForm(){
  //   if (this.loginFrom.invalid){
  //     return;
  //   }
  //   this .authService
  //   .login(this.loginFrom.get('employeePortalUserName')?.value,this.loginFrom.get('password')?.value)
  //   .subscribe((res)=>{
  //     // console.log(res);
  //     this.router.navigate(['/'])
      
  //   })
  // }


  ////////////////////////// angular the completeguid
  // submitForm(){
  //   const val = this.loginFrom.value;
  //   if(val.employeePortalUserName && val.password){
  //     this.authService.login(val.employeePortalUserName, val.password)
  //     .subscribe(()=>
  //     {
  //       console.log("User is logged in");
  //       this.router.navigateByUrl('/');
  //     });
  //   }
  // }

}
