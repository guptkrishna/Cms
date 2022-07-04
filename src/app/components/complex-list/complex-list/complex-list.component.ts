import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ComplexPostComponent } from '../../complex-post/complex-post/complex-post.component';
import { ComplexService } from 'src/app/services/complex.service';
import { ExcelService } from 'src/app/excel-service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-complex-list',
  templateUrl: './complex-list.component.html',
  styleUrls: ['./complex-list.component.css']
})
export class ComplexListComponent implements OnInit {
  displayedColumns: string[] = ['companyName', 'complexCode', 'complexName', 'complexDescription', 'complexAvailability',
    'complexCondition', 'complexCriticality', 'complexTotalGrossArea', 'complexCoveredArea', 'complexTotalVolume',
    'complexTotalHeatedVolume', 'address', 'city', 'state', 'country', 'pinCode', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('contentToConvert') contentToConvert!: ElementRef;
  data: any;

  constructor(private complexService: ComplexService, 
    private dialog: MatDialog, private excelService:ExcelService
    ) { }

  ngOnInit(): void {
    this.getAllComplex();
  }
  getAllComplex() {
    this.complexService.getComplex().subscribe({
      next: (res) => {
        console.log(res);
        this.data = res;
        //console.log(this.data.items);
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
  editComplex(row: any) {
    this.dialog.open(ComplexPostComponent, {
      width: "30%",
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllComplex();
      }
    });
  }
  deleteComplex(id: number) {
    if (confirm("Are You Sure?")) {
      this.complexService.deleteComplex(id).subscribe({
        next: (res) => {
          alert("Complex deleted successfully");
          this.getAllComplex();
        },
        error: () => {
          alert("Error while deleting Complex");
        }
      })
    }
  }
  openComplex() {
    this.dialog.open(ComplexPostComponent, {
      width: "50%",
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getAllComplex();
      }
    });
  }
  exportExcel() {
    this.excelService.exportAsExcelFile('Complex-List', '', this.displayedColumns, this.data.items,  'complex-List', 'Sheet1');
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
      PDF.save('ComplexPDF.pdf');
    });
  }

}

