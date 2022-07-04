import { Component, OnInit, Inject } from '@angular/core';
import { Complex, ComplexUpdate } from 'src/app/models/complex-model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComplexService } from 'src/app/services/complex.service';

@Component({
  selector: 'app-complex-post',
  templateUrl: './complex-post.component.html',
  styleUrls: ['./complex-post.component.css']
})
export class ComplexPostComponent implements OnInit {
  complexForm !: FormGroup;

  actionBtn: string = 'Save';
  Company: any;

  constructor(private formBuilder: FormBuilder, private complexService: ComplexService,
    private dialogRef: MatDialogRef<ComplexPostComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.showAllCompany();
    this.complexForm = this.formBuilder.group({
      id: [''],
      complexCode: new FormControl('', [Validators.required]),
      complexName: new FormControl('', [Validators.required]),
      complexDescription: new FormControl('', [Validators.required]),
      complexAvailability: new FormControl('', [Validators.required]),
      complexCondition: new FormControl('', [Validators.required]),
      complexCriticality: new FormControl('', [Validators.required]),
      complexTotalGrossArea: new FormControl('', [Validators.required]),
      complexCoveredArea: new FormControl('', [Validators.required]),
      complexTotalVolume: new FormControl('', [Validators.required]),
      complexTotalHeatedVolume: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
     // address2:new FormControl('',[Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      pinCode: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]),
       companyId: new FormControl('', [Validators.required]),
     });
    console.log(this.editData);
    if (this.editData) {
      this.actionBtn = 'Update';
      this.complexForm.controls['id'].setValue(this.editData.id);
      this.complexForm.controls['complexCode'].setValue(this.editData.complexCode);
      this.complexForm.controls['complexName'].setValue(this.editData.complexName);
      this.complexForm.controls['complexDescription'].setValue(this.editData.complexDescription);
      this.complexForm.controls['complexAvailability'].setValue(this.editData.complexAvailability);
      this.complexForm.controls['complexCondition'].setValue(this.editData.complexCondition);
      this.complexForm.controls['complexCriticality'].setValue(this.editData.complexCriticality);
      this.complexForm.controls['complexTotalGrossArea'].setValue(this.editData.complexTotalGrossArea);
      this.complexForm.controls['complexCoveredArea'].setValue(this.editData.complexCoveredArea);
      this.complexForm.controls['complexTotalVolume'].setValue(this.editData.complexTotalVolume);
      this.complexForm.controls['complexTotalHeatedVolume'].setValue(this.editData.complexTotalHeatedVolume);
      this.complexForm.controls['address'].setValue(this.editData.address);
      //this.complexForm.controls['address2'].setValue(this.editData.address2);
      this.complexForm.controls['city'].setValue(this.editData.city);
      this.complexForm.controls['state'].setValue(this.editData.state);
      this.complexForm.controls['country'].setValue(this.editData.country);
      this.complexForm.controls['pinCode'].setValue(this.editData.pinCode);
       this.complexForm.controls['companyId'].setValue(this.editData.companyId);
    }

  }

  get complexName() {
    return this.complexForm.get('complexName');
  }
  get complexTotalGrossArea() {
    return this.complexForm.get('complexTotalGrossArea');
  }
  get complexCoveredArea() {
    return this.complexForm.get('complexCoveredArea');
  }
  get complexTotalVolume() {
    return this.complexForm.get('complexTotalVolume');
  }
  get complexTotalHeatedVolume() {
    return this.complexForm.get('complexTotalHeatedVolume');
  }
  get pinCode() {
    return this.complexForm.get('pinCode');
  }

  // get complexDescription() {
  //   return this.complexForm.get('complexDescription');
  // }

  addComplex() {
    let complex = new Complex();
    complex.complexCode = this.complexForm.value.complexCode;
    complex.complexName = this.complexForm.value.complexName;
    complex.complexDescription = this.complexForm.value.complexDescription;
    complex.complexAvailability = this.complexForm.value.complexAvailability;
    complex.complexCondition = this.complexForm.value.complexCondition;
    complex.complexCriticality = this.complexForm.value.complexCriticality;
    complex.complexTotalGrossArea = this.complexForm.value.complexTotalGrossArea;
    complex.complexCoveredArea = this.complexForm.value.complexCoveredArea;
    complex.complexTotalVolume = this.complexForm.value.complexTotalVolume;
    complex.complexTotalHeatedVolume = this.complexForm.value.complexTotalHeatedVolume;
    complex.address = this.complexForm.value.address;
    //complex.address2 = this.complexForm.value.address2;
    complex.city = this.complexForm.value.city;
    complex.state = this.complexForm.value.state;
    complex.country = this.complexForm.value.country;
    complex.pinCode = this.complexForm.value.pinCode;
    complex.companyId = this.complexForm.value.companyId;
    if (!this.editData) {
      if (this.complexForm.valid) {
        this.complexService.postComplex(complex).subscribe({
          next: (res) => {
            alert("complex added successfully");
            this.complexForm.reset();
            this.dialogRef.close('save');
            // this.getAllEmployee();
          },
          error: () => {
            alert("Error while addeding complex");
          }
        })
      }
    }
    else {
      this.updateComplex();
    }
  }
  updateComplex() {

    let complex = new ComplexUpdate();
    complex.id = this.editData.id;
    complex.complexCode = this.complexForm.value.complexCode;
    complex.complexName = this.complexForm.value.complexName;
    complex.complexDescription = this.complexForm.value.complexDescription;
    complex.complexAvailability = this.complexForm.value.complexAvailability;
    complex.complexCondition = this.complexForm.value.complexCondition;
    complex.complexCriticality = this.complexForm.value.complexCriticality;
    complex.complexTotalGrossArea = this.complexForm.value.complexTotalGrossArea;
    complex.complexCoveredArea = this.complexForm.value.complexCoveredArea;
    complex.complexTotalVolume = this.complexForm.value.complexTotalVolume;
    complex.complexTotalHeatedVolume = this.complexForm.value.complexTotalHeatedVolume;
    complex.address = this.complexForm.value.address;
   //complex.address2 = this.complexForm.value.address2;
    complex.city = this.complexForm.value.city;
    complex.state = this.complexForm.value.state;
    complex.country = this.complexForm.value.country;
    complex.pinCode = this.complexForm.value.pinCode;
     complex.companyId = this.complexForm.value.companyId;
    if (this.complexForm.valid) {
      this.complexService.putComplex(complex).subscribe({
        next: (res) => {
          alert("complex updated successfully.");
          this.complexForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating complex");
        }
      })
    }
  }
  showAllCompany(){
    this.complexService.getcompany().subscribe(
      (data:any)=>{
        this.Company=data.items;
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
