import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuildingService } from 'src/app/services/building.service';
import { Building, BuildingUpdate } from 'src/app/models/building-model';

@Component({
  selector: 'app-building-post',
  templateUrl: './building-post.component.html',
  styleUrls: ['./building-post.component.css']
})
export class BuildingPostComponent implements OnInit {
  buildingForm !: FormGroup;

  actionBtn: string = 'Save';
  Complex: any;
  
  // Company:any;
  // selectedCompany:any={
  //  companyId :0, companyName:''
  // };

  constructor(
    private formBuilder: FormBuilder, private buildingService: BuildingService,
    private dialogRef: MatDialogRef<BuildingPostComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }


  ngOnInit(): void {
    // this.onSelected(this.selectedCompany.companyId);
    this.showAllComplex();
    this.buildingForm = this.formBuilder.group({
      id: [''],
      buildingCode: new FormControl('', [Validators.required]),
      buildingName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      buildingAvailability: new FormControl('', [Validators.required]),
      buildingMainUse: new FormControl('', [Validators.required]),
      buildingTotalGrossArea: new FormControl('', [Validators.required]),
      buildingTotalNetArea: new FormControl('', [Validators.required]),
      buildingCoveredArea: new FormControl('', [Validators.required]),
      buildingGlazedArea: new FormControl('', [Validators.required]),
      buildingTotalVolume: new FormControl('', [Validators.required]),
      buildingCleanableArea: new FormControl('', [Validators.required]),
      buildingTotalheatedvolume: new FormControl('', [Validators.required]),
      buildingNumberofFloors: new FormControl('', [Validators.required]),
      buildingNumberofRoom: new FormControl('', [Validators.required]),
      buildingCondition: new FormControl('', [Validators.required]),
      buildingCriticality: new FormControl('', [Validators.required]),
      address:new FormControl('',[Validators.required]),
     //address2:new FormControl('',[Validators.required]),
    city:new FormControl('',[Validators.required]),
    state:new FormControl('',[Validators.required]),
    country:new FormControl('',[Validators.required]),
    pinCode:new FormControl('',[Validators.required]),
      complexId: new FormControl('', [Validators.required])
    });
    console.log(this.editData);
    if (this.editData) {
      this.actionBtn = 'Update';
      this.buildingForm.controls['id'].setValue(this.editData.id);
      this.buildingForm.controls['buildingCode'].setValue(this.editData.buildingCode);
      this.buildingForm.controls['buildingName'].setValue(this.editData.buildingName);
      this.buildingForm.controls['buildingAvailability'].setValue(this.editData.buildingAvailability);
      this.buildingForm.controls['buildingMainUse'].setValue(this.editData.buildingMainUse);
      this.buildingForm.controls['buildingTotalGrossArea'].setValue(this.editData.buildingTotalGrossArea);
      this.buildingForm.controls['buildingTotalNetArea'].setValue(this.editData.buildingTotalNetArea);
      this.buildingForm.controls['buildingCoveredArea'].setValue(this.editData.buildingCoveredArea);
      this.buildingForm.controls['buildingGlazedArea'].setValue(this.editData.buildingGlazedArea);
      this.buildingForm.controls['buildingTotalVolume'].setValue(this.editData.buildingTotalVolume);
      this.buildingForm.controls['buildingCleanableArea'].setValue(this.editData.buildingCleanableArea);
      this.buildingForm.controls['buildingTotalheatedvolume'].setValue(this.editData.buildingTotalheatedvolume);
      this.buildingForm.controls['buildingNumberofFloors'].setValue(this.editData.buildingNumberofFloors);
      this.buildingForm.controls['buildingNumberofRoom'].setValue(this.editData.buildingNumberofRoom);
      this.buildingForm.controls['buildingCondition'].setValue(this.editData.buildingCondition);
      this.buildingForm.controls['buildingCriticality'].setValue(this.editData.buildingCriticality);
      this.buildingForm.controls['address'].setValue(this.editData.address);
       //this.buildingForm.controls['address2'].setValue(this.editData.address2);
      this.buildingForm.controls['city'].setValue(this.editData.city);
      this.buildingForm.controls['state'].setValue(this.editData.state);
      this.buildingForm.controls['country'].setValue(this.editData.country);
      this.buildingForm.controls['pinCode'].setValue(this.editData.pinCode);
      this.buildingForm.controls['complexId'].setValue(this.editData.complexId);
    }
  }
  get buildingName() {
    return this.buildingForm.get('buildingName');
  }
  get pinCode() {
    return this.buildingForm.get('pinCode')
  }

  addBuilding() {
    let building = new Building();
    building.buildingCode = this.buildingForm.value.buildingCode;
    building.buildingName = this.buildingForm.value.buildingName;
    building.buildingAvailability = this.buildingForm.value.buildingAvailability;
    building.buildingMainUse = this.buildingForm.value.buildingMainUse;
    building.buildingTotalGrossArea = this.buildingForm.value.buildingTotalGrossArea;
    building.buildingTotalNetArea = this.buildingForm.value.buildingTotalNetArea;
    building.buildingCoveredArea = this.buildingForm.value.buildingCoveredArea;
    building.buildingGlazedArea = this.buildingForm.value.buildingGlazedArea;
    building.buildingTotalVolume = this.buildingForm.value.buildingTotalVolume;
    building.buildingCleanableArea = this.buildingForm.value.buildingCleanableArea;
    building.buildingTotalheatedvolume = this.buildingForm.value.buildingTotalheatedvolume;
    building.buildingNumberofFloors = this.buildingForm.value.buildingNumberofFloors;
    building.buildingNumberofRoom = this.buildingForm.value.buildingNumberofRoom;
    building.buildingCondition = this.buildingForm.value.buildingCondition;
    building.buildingCriticality = this.buildingForm.value.buildingCriticality;
    building.address = this.buildingForm.value.address;
   // building.address2 = this.buildingForm.value.address2;
    building.city = this.buildingForm.value.city;
    building.state = this.buildingForm.value.state;
    building.country = this.buildingForm.value.country;
    building.pinCode = this.buildingForm.value.pinCode;
    building.complexId = this.buildingForm.value.complexId;
    if (!this.editData) {
      if (this.buildingForm.valid) {
        this.buildingService.postBuilding(building).subscribe({
          next: (res) => {
            alert("building added successfully");
            this.buildingForm.reset();
            this.dialogRef.close('save');
            // this.getAllEmployee();
          },
          error: () => {
            alert("Error while addeding building");
          }
        })
      }
    }
    else {
      this.updateBuilding();
    }
  }
  updateBuilding() {

    let building = new BuildingUpdate();
    building.id = this.editData.id;
    building.buildingCode = this.buildingForm.value.buildingCode;
    building.buildingName = this.buildingForm.value.buildingName;
    building.buildingAvailability = this.buildingForm.value.buildingAvailability;
    building.buildingMainUse = this.buildingForm.value.buildingMainUse;
    building.buildingTotalGrossArea = this.buildingForm.value.buildingTotalGrossArea;
    building.buildingTotalNetArea = this.buildingForm.value.buildingTotalNetArea;
    building.buildingCoveredArea = this.buildingForm.value.buildingCoveredArea;
    building.buildingGlazedArea = this.buildingForm.value.buildingGlazedArea;
    building.buildingTotalVolume = this.buildingForm.value.buildingTotalVolume;
    building.buildingCleanableArea = this.buildingForm.value.buildingCleanableArea;
    building.buildingTotalheatedvolume = this.buildingForm.value.buildingTotalheatedvolume;
    building.buildingNumberofFloors = this.buildingForm.value.buildingNumberofFloors;
    building.buildingNumberofRoom = this.buildingForm.value.buildingNumberofRoom;
    building.buildingCondition = this.buildingForm.value.buildingCondition;
    building.buildingCriticality = this.buildingForm.value.buildingCriticality;
    building.address = this.buildingForm.value.address;
    //building.address2 = this.buildingForm.value.address2;
    building.city = this.buildingForm.value.city;
    building.state = this.buildingForm.value.state;
    building.country = this.buildingForm.value.country;
    building.pinCode = this.buildingForm.value.pinCode;
    building.complexId = this.buildingForm.value.complexId;
    if (this.buildingForm.valid) {
      this.buildingService.putBuilding(building).subscribe({
        next: (res) => {
          alert("building updated successfully.");
          this.buildingForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating building");
        }
      })
    }
  }
  // onSelected(Company_companyId:any){
  //   this.buildingService.getcompany().subscribe((res:any)=>{
  //     this.Complex = res['Complex'].filter(
  //       (res:any)=>res.Company_companyId== Company_companyId!.value
  //     ),
  //     console.log(this.Complex);
  //   })
//}
  
  showAllComplex(){
    this.buildingService.getcomplex().subscribe(
      (data:any)=>{
        this.Complex=data.items;
        console.log(this.Complex.items)
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

