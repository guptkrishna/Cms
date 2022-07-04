import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company, CompanyUpdate } from 'src/app/models/company-model';

@Component({
  selector: 'app-company-post',
  templateUrl: './company-post.component.html',
  styleUrls: ['./company-post.component.css']
})
export class CompanyPostComponent implements OnInit {
  companyForm !: FormGroup;
  // countries: any;
  // states: any;
  // selectedCountry: any = {
  //   name: ''
  // }

  actionBtn: string = 'Save';
  states: any;

  constructor(private formBuilder: FormBuilder, private companyService: CompanyService,
    private dialogRef: MatDialogRef<CompanyPostComponent>,

    @Inject(MAT_DIALOG_DATA) public editData: any) { }


  ngOnInit(): void {
    // this.showAll();
    // this .showAllst();
    // this.onSelect(this.selectedCountry.name);
    this.companyForm = this.formBuilder.group({
      id: [''],
      companyCode: new FormControl('', [Validators.required]),
      companyName: new FormControl('', [Validators.required, Validators.minLength(6)]),
      companyDescription: new FormControl('', [Validators.required, Validators.maxLength(300), Validators.minLength(5)]),
      address: new FormControl('', [Validators.required]),
      //address2:new FormControl('',[Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      pinCode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])

    });

    console.log(this.editData);
    if (this.editData) {
      this.actionBtn = 'Update';
      this.companyForm.controls['id'].setValue(this.editData.id);
      this.companyForm.controls['companyCode'].setValue(this.editData.companyCode);
      this.companyForm.controls['companyName'].setValue(this.editData.companyName);
      this.companyForm.controls['companyDescription'].setValue(this.editData.companyDescription);
      this.companyForm.controls['address'].setValue(this.editData.address);
      //this.companyForm.controls['address2'].setValue(this.editData.address2);
      this.companyForm.controls['city'].setValue(this.editData.city);
      this.companyForm.controls['state'].setValue(this.editData.state);
      this.companyForm.controls['country'].setValue(this.editData.country);
      this.companyForm.controls['pinCode'].setValue(this.editData.pinCode);
    }

  }
  // public myError = (controlName: string, errorName: string) =>{
  //   return this.companyForm.controls[controlName].hasError(errorName);
  // }
  get companyName() {
    return this.companyForm.get('companyName');
  }
  get pinCode() {
    return this.companyForm.get('pinCode')
  }
  get companyDescription() {
    return this.companyForm.get('companyDescription');
  }

  addCompany() {
    let company = new Company();
    company.companyCode = this.companyForm.value.companyCode;
    company.companyName = this.companyForm.value.companyName;
    company.companyDescription = this.companyForm.value.companyDescription;
    company.address = this.companyForm.value.address;
    //company.address2 = this.companyForm.value.address2;
    company.city = this.companyForm.value.city;
    company.state = this.companyForm.value.state;
    company.country = this.companyForm.value.country;
    company.pinCode = this.companyForm.value.pinCode;


    if (!this.editData) {

      if (this.companyForm.valid) {
        this.companyService.postCompany(company).subscribe({
          next: (res) => {
            alert("Company added successfully");
            console.table(this.companyForm.value);
            this.companyForm.reset();
            this.dialogRef.close('save');
            // this.getAllEmployee();
          },
          error: () => {
            alert("Error while addeding Company");
          }
        })
      }
    }
    else {
      this.updateCompany();
    }
  }
  updateCompany() {

    let company = new CompanyUpdate();
    company.id = this.editData.id;
    company.companyCode = this.companyForm.value.companyCode;
    company.companyName = this.companyForm.value.companyName;
    company.companyDescription = this.companyForm.value.companyDescription;
    company.address = this.companyForm.value.address;
    //company.address2 = this.companyForm.value.address2;
    company.city = this.companyForm.value.city;
    company.state = this.companyForm.value.state;
    company.country = this.companyForm.value.country;
    company.pinCode = this.companyForm.value.pinCode;
    if (this.companyForm.valid) {
      this.companyService.putCompany(company).subscribe({
        next: (res) => {
          alert("Company updated successfully.");
          this.companyForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating Company");
        }
      })
    }
  }

  // showAll() {
  //   this.companyService.getall().subscribe((data: any) => {
  //     this.countries = data,
  //       console.log(this.countries)
  //   })
  // }
  
  // showAllst() {
    
  //   console.log(this.states);
  //   this.companyService.getall().subscribe((states: any)=>{
  //     this.states = states;
  //   })
    
  //}
  // onSelect(country_name: any){
  //   this.companyService.getall().subscribe((res:any)=>{
  //     this.states = res['states'].filter(
  //       (res:any)=>res.country_name == country_name.value
  //     ),
  //     console.log(this.states);
  //   })
  // }
    
  //for dropdown country, state, and city
  // selectedCountry: String = "--Choose Country--";
  // selectedstate:string="--Choose State--";
  
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
  
    	// states: Array<any> = []; 
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
