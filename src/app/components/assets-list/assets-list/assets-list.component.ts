import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AssetsService } from 'src/app/services/assets.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AssetsPostComponent } from '../../assets-post/assets-post/assets-post.component';
import { ExcelService } from 'src/app/excel-service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.css']
})
export class AssetsListComponent implements OnInit {

  displayedColumns: string[] = ['buildingName','assetsType', 'assetsCode', 'assetsName', 'assetsManufacturer',
    'assetsSupplier', 'assetsPurchasePrice', 'assetsInvoiceNumber', 'assetsCurrentValue', 'assetsYearofLife',
    'assetsAmortizationEnd', 'assetsDisposalDate', 'assetsAmortizationStart', 'assetsAnnualAmortization', 'assetsSubset',
    'assetsCondition', 'assetsCriticality', 'assetsLastCheckDate', 'floor', 'room', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('htmlData') htmlData!: ElementRef;
  data: any;

  constructor(private assetsService: AssetsService, private excelService:ExcelService
    , private dialog: MatDialog) { }
    
   

  ngOnInit(): void {

    this.getAllAssets();
  }

  getAllAssets() {
    this.assetsService.getAssets().subscribe({
      next: (res: any) => {
        console.log(res);
        this.data = res;
        console.log(this.data.items);
        this.dataSource = new MatTableDataSource(this.data.items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error while fetching the records.")
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editAssets(row: any) {
    this.dialog.open(AssetsPostComponent, {
      width: "30%",
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllAssets();
      }
    });
  }

  deleteAssets(id: number) {
    if (confirm("Are You Sure?")) {
      this.assetsService.deleteAssets(id).subscribe({
        next: (res) => {
          alert("Assets deleted successfully");
          this.getAllAssets();
        },
        error: () => {
          alert("Error while deleting assets");
        }
      })
    }
  }

  openAssets() {
    this.dialog.open(AssetsPostComponent, {
      width: "50%",
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getAllAssets();
      }
    });
  }
  exportExcel() {
    this.excelService.exportAsExcelFile('Assets-List', '', this.displayedColumns, this.data.items,  'assets-List', 'Sheet1');
    
  }
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('AssetsPDF.pdf');
    });
  }


}
