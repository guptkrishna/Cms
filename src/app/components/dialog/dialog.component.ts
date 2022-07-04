import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee, EmployeeUpdate } from 'src/app/models/employee-model';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
//import { EmployeeListComponent } from '../employee-list/employee-list.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  employeeForm !: FormGroup;

  actionBtn: string = 'Save';
  Company: any;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.showAllCompany();
    this.employeeForm = this.formBuilder.group({
      id: new FormControl(''),
      employeeCode: new FormControl('', [Validators.required]),
      employeeFirstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      employeeLastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      employeeEmail: new FormControl('', [Validators.required, Validators.email]),

      employeeMobileNumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      employeePortalUserName: new FormControl('', [Validators.required]),
      password:new FormControl('',[Validators.required]),
      employeeStatus: new FormControl('', [Validators.required]),
      employeeTeam: new FormControl('', [Validators.required]),
      companyId: new FormControl('', [Validators.required]),
      address1: new FormControl('', [Validators.required]),
      address2: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      pinCode: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6)])

    });

    console.log(this.editData);

    if (this.editData) {
      this.actionBtn = 'Update';
      this.employeeForm.controls['id'].setValue(this.editData.id);
      this.employeeForm.controls['employeeCode'].setValue(this.editData.employeeCode);
      this.employeeForm.controls['employeeFirstName'].setValue(this.editData.employeeFirstName);
      this.employeeForm.controls['employeeLastName'].setValue(this.editData.employeeLastName);
      this.employeeForm.controls['employeeEmail'].setValue(this.editData.employeeEmail);

      this.employeeForm.controls['employeeMobileNumber'].setValue(this.editData.employeeMobileNumber);
      this.employeeForm.controls['employeePortalUserName'].setValue(this.editData.employeePortalUserName);
      this.employeeForm.controls['password'].setValue(this.editData.password);
      this.employeeForm.controls['employeeStatus'].setValue(this.editData.employeeStatus);
      this.employeeForm.controls['employeeTeam'].setValue(this.editData.employeeTeam);
      this.employeeForm.controls['address1'].setValue(this.editData.address1);
      this.employeeForm.controls['address2'].setValue(this.editData.address2);
      this.employeeForm.controls['city'].setValue(this.editData.city);
      this.employeeForm.controls['state'].setValue(this.editData.state);
      this.employeeForm.controls['country'].setValue(this.editData.country);
      this.employeeForm.controls['pinCode'].setValue(this.editData.pinCode);
      this.employeeForm.controls['companyId'].setValue(this.editData.companyId);
    }
  }

  get employeeEmail() {
    return this.employeeForm.get('employeeEmail');
  }
  get employeeMobileNumber() {
    return this.employeeForm.get('employeeMobileNumber')
  }

  get employeeFirstName() {
    return this.employeeForm.get('employeeFirstName')
  }
  get employeeLastName() {
    return this.employeeForm.get('employeeLastName')
  }

  get pinCode() {
    return this.employeeForm.get('pinCode')
  }
  
  addEmployee() {
    let employee = new Employee();
    employee.employeeCode = this.employeeForm.value.employeeCode;
    employee.employeeFirstName = this.employeeForm.value.employeeFirstName;
    employee.employeeLastName = this.employeeForm.value.employeeLastName;
    employee.employeeEmail = this.employeeForm.value.employeeEmail;

    employee.employeeMobileNumber = this.employeeForm.value.employeeMobileNumber;
    employee.employeePortalUserName = this.employeeForm.value.employeePortalUserName;
    employee.password=this.employeeForm.value.password;
    employee.employeeStatus = this.employeeForm.value.employeeStatus;
    employee.employeeTeam = this.employeeForm.value.employeeTeam;
    employee.address1 = this.employeeForm.value.address1;
    employee.address2 = this.employeeForm.value.address2;
    employee.city = this.employeeForm.value.city;
    employee.state = this.employeeForm.value.state;
    employee.country = this.employeeForm.value.country;
    employee.pinCode = this.employeeForm.value.pinCode;
    employee.companyId = this.employeeForm.value.companyId;


    if (!this.editData) {
      if (this.employeeForm.valid) {
        this.employeeService.postEmployee(employee).subscribe({
          next: (res) => {
            alert("Employee added successfully");
            this.employeeForm.reset();
            this.dialogRef.close('save');
            //this.getAllEmployee();
          },
          error: () => {
            alert("Error while addeding employee");
          }
        })
      }
    }
    else {
      this.updateEmployee();
    }

  }

  updateEmployee() {

    let employee = new EmployeeUpdate();
    employee.id = this.editData.id;
    employee.employeeCode = this.employeeForm.value.employeeCode
    employee.employeeFirstName = this.employeeForm.value.employeeFirstName;
    employee.employeeLastName = this.employeeForm.value.employeeLastName;
    employee.employeeEmail = this.employeeForm.value.employeeEmail;

    employee.employeeMobileNumber = this.employeeForm.value.employeeMobileNumber;
    employee.employeePortalUserName = this.employeeForm.value.employeePortalUserName;
    employee.password= this.employeeForm.value.password;
    employee.employeeStatus = this.employeeForm.value.employeeStatus;
    employee.employeeTeam = this.employeeForm.value.employeeTeam;
    employee.address1 = this.employeeForm.value.address1;
    employee.address2 = this.employeeForm.value.address2;
    employee.city = this.employeeForm.value.city;
    employee.state = this.employeeForm.value.state;
    employee.country = this.employeeForm.value.country;
    employee.pinCode = this.employeeForm.value.pinCode;
    employee.companyId = this.employeeForm.value.companyId;

    if (this.employeeForm.valid) {
      this.employeeService.putEmployee(employee).subscribe({
        next: (res) => {
          alert("Employee updated successfully.");
          this.employeeForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating employee");
        }
      })
    }
  }

  showAllCompany() {
    this.employeeService.getcompany().subscribe(
      (data: any) => {
        this.Company = data.items;
        console.log(this.Company)
      }
    )
  }

  Countries: Array<any> = [
    { name: 'India', states: [ {name: 'Uttrakhand', cities: [{name:'Haridwar'},{name: 'Deharadun'},{name: 'Kashipur'},{name: 'Roorkee'},
    {name: 'Haldwani'},{name: 'Rishikesh'},{name: 'Rudrapur'},{name: 'Nainital'}
    ,{name: 'Laskar'} ,{name: 'Massorie'}]},

    {name:'Uttar Pradesh',cities:[{name:'Agra'},{name: 'Aligarh'},{name: 'Ambedkar Nagar'},{name: 'Bareli'},{name: 'Faizabad'},{name: 'Basti'},{name: 'Varansi'},
    {name: 'Pryagraj'},{name: 'Saharanpur'},{name: 'Deoria'},{name: 'Kushinagar'},{name: 'Sultanpur'},{name: 'Gonda'},{name: 'Ghazipur'},
    {name: 'Gorakhpur'},{name: 'Meerut'}, {name:'Sitapur'},{name:'Lucknow'},{name:'Noida'}]},

    {name:'Telangana',cities:[{name:'Hyderbad'},{name: 'Nizamabad'},{name: 'Kuntala'},{name: 'Warangal'},{name: 'Karimnagar'},{name: 'Khammam'},{name: 'Jagtial'},
    {name: 'Mahbubnagar'},{name: 'Ramagundam'},{name: 'Ranga Reddy'},{name: 'Nalgonda'},{name: 'Medak'},{name: 'Ichoda'},{name: 'Isnagpur'},
    {name: 'Gangaon'},{name: 'Koratla'}, {name:'Kothur'},{name:'Madhira'},{name:'Bhongir'}]},
    
    {name:'Delhi',cities:[{name:'Aali'},{name: 'Ali Pur'},{name: 'Asola'},{name: 'Bankauli'},{name: 'Bankner'},{name: 'Barwala'},{name: 'Chatter Pur'},
    {name: 'Chillasaroda'},{name: 'Dalllo Pur'},{name: 'Delhi Cantonment'},{name: 'Fatehpur Beri'},{name: 'Gokal Pur'},{name: 'Jonapur'},{name: 'Karala'},
    {name: 'Khera'},{name: 'Ladpur'}, {name:'Mandoli'},{name:'New Delhi'},{name:'Qadipur'}]}
  ]},
   
		{ name: 'Germany', states: [ {name: 'newyark', cities: [{name:'Duesseldorf'}]} ] },
		{ name: 'Spain', states: [ {name: 'utk', cities: [{name:'Barcelona'}]} ] },
		{ name: 'USA', states: [ {name: 'mero', cities: [{name:'Downers'}, {name:'Grove'}]} ] },
		{ name: 'Mexico', states: [ {name: 'pue', cities: [{name:'Puebla'}]} ] },
		
	];
  
  states: Array<any> = []; 
	cities: Array<any> = []; 
	
	changeCountry(country: any) { 
		//this.states = this.Countries.find(cntry => cntry.name == country).states; 
		this.states = this.Countries.find((cntry: any) => cntry.name == country.target.value).states; 
	}

	changeState(state: any) { 
		//this.cities = this.Countries.find(cntry => cntry.name == this.selectedCountry).states.find(stat => stat.name == state).cities;
		this.cities = this.states.find((cntry: any) => cntry.name == state.target.value).cities 
	}

}
