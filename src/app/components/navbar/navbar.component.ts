import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyPostComponent } from '../Companys-Post/company-post/company-post.component';
import { ComplexPostComponent } from '../complex-post/complex-post/complex-post.component';
import { DialogComponent } from '../dialog/dialog.component';
import { BuildingPostComponent } from '../building-post/building-post/building-post.component';
import { AssetsPostComponent } from '../assets-post/assets-post/assets-post.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  actionBtn: string = 'login';
  loginlogout:boolean=false;

  constructor(private dialog: MatDialog, private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
  }

  // loggedin(){
  //   return localStorage.getItem('login');
  // }

  // onLogout(){
  //   this.auth.logout();
  //   localStorage.removeItem('login');
  // }
 
  login(){
    this.router.navigate(['login'])
  }
  logout(){
     this.auth.logout();
    this.router.navigate(['login'])
  }
  


  openEmployee() {
    this.dialog.open(DialogComponent, {
      width: "30%",
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
      }
    });
  }
  openCompany() {
    this.dialog.open(CompanyPostComponent, {
      width: "30%",
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
      }
    });
  }
  openComplex() {
    this.dialog.open(ComplexPostComponent, {
      width: "30%",
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
      }
    });
  }
  openBuilding() {
    this.dialog.open(BuildingPostComponent, {
      width: "30%",
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
      }
    });
  }
  openAssets() {
    this.dialog.open(AssetsPostComponent, {
      width: "30%",
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
      }
    });
  }

}
