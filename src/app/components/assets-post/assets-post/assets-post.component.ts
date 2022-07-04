import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetsService } from 'src/app/services/assets.service';
import { Assets, AssetsUpdate } from 'src/app/models/assets-model';

@Component({
  selector: 'app-assets-post',
  templateUrl: './assets-post.component.html',
  styleUrls: ['./assets-post.component.css']
})
export class AssetsPostComponent implements OnInit {
  
  assetsForm !: FormGroup;

  actionBtn: string = 'Save';
  Complex: any;
  Building: any;
  // states: any;

  constructor(private formBuilder: FormBuilder, private assetsservice: AssetsService,
    private dialogRef: MatDialogRef<AssetsPostComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.showAllBuilding();
    this.assetsForm = this.formBuilder.group({
      id: [''],
      assetsType: new FormControl('', [Validators.required]),
      assetsCode: new FormControl('', [Validators.required]),
      assetsName: new FormControl('', [Validators.required]),
      assetsManufacturer: new FormControl('', [Validators.required]),
      assetsSupplier: new FormControl('', [Validators.required]),
      assetsPurchasePrice: new FormControl('', [Validators.required]),
      assetsInvoiceNumber: new FormControl('', [Validators.required]),
      assetsCurrentValue: new FormControl('', [Validators.required]),
      assetsYearofLife: new FormControl('', [Validators.required]),
      assetsAmortizationEnd: new FormControl('', [Validators.required]),
      assetsDisposalDate: new FormControl('', [Validators.required]),
      assetsAmortizationStart: new FormControl('', [Validators.required]),
      assetsAnnualAmortization: new FormControl('', [Validators.required]),
      assetsSubset: new FormControl('', [Validators.required]),
      assetsCondition: new FormControl('', [Validators.required]),
      assetsCriticality: new FormControl('', [Validators.required]),
      assetsLastCheckDate: new FormControl('', [Validators.required]),
      floor: new FormControl('', [Validators.required]),
      room: new FormControl('', [Validators.required]),
      buildingId: ['', Validators.required],
    });

    console.log(this.editData);
    if (this.editData) {
      this.actionBtn = 'Update';
      this.assetsForm.controls['id'].setValue(this.editData.id);
      this.assetsForm.controls['assetsType'].setValue(this.editData.assetsType);
      this.assetsForm.controls['assetsCode'].setValue(this.editData.assetsCode);
      this.assetsForm.controls['assetsName'].setValue(this.editData.assetsName);
      this.assetsForm.controls['assetsManufacturer'].setValue(this.editData.assetsManufacturer);
      this.assetsForm.controls['assetsSupplier'].setValue(this.editData.assetsSupplier);
      this.assetsForm.controls['assetsPurchasePrice'].setValue(this.editData.assetsPurchasePrice);
      this.assetsForm.controls['assetsInvoiceNumber'].setValue(this.editData.assetsInvoiceNumber);
      this.assetsForm.controls['assetsCurrentValue'].setValue(this.editData.assetsCurrentValue);
      this.assetsForm.controls['assetsYearofLife'].setValue(this.editData.assetsYearofLife);
      this.assetsForm.controls['assetsAmortizationEnd'].setValue(this.editData.assetsAmortizationEnd);
      this.assetsForm.controls['assetsDisposalDate'].setValue(this.editData.assetsDisposalDate);
      this.assetsForm.controls['assetsAmortizationStart'].setValue(this.editData.assetsAmortizationStart);
      this.assetsForm.controls['assetsAnnualAmortization'].setValue(this.editData.assetsAnnualAmortization);
      this.assetsForm.controls['assetsSubset'].setValue(this.editData.assetsSubset);
      this.assetsForm.controls['assetsCondition'].setValue(this.editData.assetsCondition);
      this.assetsForm.controls['assetsCriticality'].setValue(this.editData.assetsCriticality);
      this.assetsForm.controls['assetsLastCheckDate'].setValue(this.editData.assetsLastCheckDate);
      this.assetsForm.controls['floor'].setValue(this.editData.floor);
      this.assetsForm.controls['room'].setValue(this.editData.room);
      this.assetsForm.controls['buildingId'].setValue(this.editData.buildingId);
    }
  }

  get assetsName() {
    return this.assetsForm.get('assetsName')
  }

  addAssets() {
    let assets = new Assets();

    assets.assetsType = this.assetsForm.value.assetsType;
    assets.assetsCode = this.assetsForm.value.assetsCode;
    assets.assetsName = this.assetsForm.value.assetsName;
    assets.assetsManufacturer = this.assetsForm.value.assetsManufacturer;
    assets.assetsSupplier = this.assetsForm.value.assetsSupplier;
    assets.assetsPurchasePrice = this.assetsForm.value.assetsPurchasePrice;
    assets.assetsInvoiceNumber = this.assetsForm.value.assetsInvoiceNumber;
    assets.assetsCurrentValue = this.assetsForm.value.assetsCurrentValue;
    assets.assetsYearofLife = this.assetsForm.value.assetsYearofLife;
    assets.assetsAmortizationEnd = this.assetsForm.value.assetsAmortizationEnd;
    assets.assetsDisposalDate = this.assetsForm.value.assetsDisposalDate;
    assets.assetsAmortizationStart = this.assetsForm.value.assetsAmortizationStart;
    assets.assetsAnnualAmortization = this.assetsForm.value.assetsAnnualAmortization;
    assets.assetsSubset = this.assetsForm.value.assetsSubset;
    assets.assetsCondition = this.assetsForm.value.assetsCondition;
    assets.assetsCriticality = this.assetsForm.value.assetsCriticality;
    assets.assetsLastCheckDate = this.assetsForm.value.assetsLastCheckDate;
    assets.floor = this.assetsForm.value.floor;
    assets.room = this.assetsForm.value.room;
    assets.buildingId = this.assetsForm.value.buildingId;

    if (!this.editData) {
      if (this.assetsForm.valid) {
        this.assetsservice.postAssets(assets).subscribe({
          next: (res) => {
            alert("Assets added successfully");
            this.assetsForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert("Error while adding assets");
          }
        })
      }
    }
    else {
      this.updateAssets();
    }

  }
  updateAssets() {
    let assets = new AssetsUpdate();
    assets.id = this.assetsForm.value.id;
    assets.assetsType = this.assetsForm.value.assetsType;
    assets.assetsCode = this.assetsForm.value.assetsCode;
    assets.assetsName = this.assetsForm.value.assetsName;
    assets.assetsManufacturer = this.assetsForm.value.assetsManufacturer;
    assets.assetsSupplier = this.assetsForm.value.assetsSupplier;
    assets.assetsPurchasePrice = this.assetsForm.value.assetsPurchasePrice;
    assets.assetsInvoiceNumber = this.assetsForm.value.assetsInvoiceNumber;
    assets.assetsCurrentValue = this.assetsForm.value.assetsCurrentValue;
    assets.assetsYearofLife = this.assetsForm.value.assetsYearofLife;
    assets.assetsAmortizationEnd = this.assetsForm.value.assetsAmortizationEnd;
    assets.assetsDisposalDate = this.assetsForm.value.assetsDisposalDate;
    assets.assetsAmortizationStart = this.assetsForm.value.assetsAmortizationStart;
    assets.assetsAnnualAmortization = this.assetsForm.value.assetsAnnualAmortization;
    assets.assetsSubset = this.assetsForm.value.assetsSubset;
    assets.assetsCondition = this.assetsForm.value.assetsCondition;
    assets.assetsCriticality = this.assetsForm.value.assetsCriticality;
    assets.assetsLastCheckDate = this.assetsForm.value.assetsLastCheckDate;
    assets.floor = this.assetsForm.value.floor;
    assets.room = this.assetsForm.value.room;
    assets.buildingId = this.assetsForm.value.buildingId;

    if (this.assetsForm.valid) {
      this.assetsservice.putAssets(assets).subscribe({
        next: (res) => {
          alert("Assets updated successfully.");
          this.assetsForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating assets");
        }
      })
    }

  }

  showAllBuilding() {
    this.assetsservice.getBuilding().subscribe(
      (data: any) => {
        this.Building = data.items;

      }
    )

  }

}
