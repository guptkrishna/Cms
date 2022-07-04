import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialComponentModule } from './material.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CompanyPostComponent } from './components/Companys-Post/company-post/company-post.component';
import { ComplexPostComponent } from './components/complex-post/complex-post/complex-post.component';
import { AssetsPostComponent } from './components/assets-post/assets-post/assets-post.component';
import { BuildingPostComponent } from './components/building-post/building-post/building-post.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginPageComponent } from './components/Login/login-page/login-page.component';
import { SignupPageComponent } from './components/signup/signup-page/signup-page.component';
import { NewComponentComponent } from './components/dateTime/new-component/new-component.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DialogComponent,
    CompanyPostComponent,
    ComplexPostComponent,
    AssetsPostComponent,
    BuildingPostComponent,
    LoginPageComponent,
    SignupPageComponent,
    routingComponent,
    NewComponentComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponentModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
  
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
