import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyPostComponent } from '../../Companys-Post/company-post/company-post.component';
import { MatDialog } from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/company.service';
import { ExcelService } from 'src/app/excel-service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'companyCode', 'companyName', 'companyDescription', 'address', 'country',
    'state', 'city', 'pinCode', 'action'];
  dataSource !: MatTableDataSource<any>;

  title = "html-to-pdf-angular-application";

  // fileName= 'ExcelSheet.xlsx'; 


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('htmlData') htmlData!: ElementRef;
  data: any;

  constructor(private companyService: CompanyService, private dialog: MatDialog, private excelService: ExcelService) {
  }

  ngOnInit(): void {
    this.getAllCompany();
    // this.exportexcel();

  }
  getAllCompany() {
    this.companyService.getCompany().subscribe({
      next: (res) => {
        console.log(res);
        this.data = res;
        //console.log(this.data.items);
        this.dataSource = new MatTableDataSource(this.data.items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (_err) => {
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
  editCompany(row: any) {
    this.dialog.open(CompanyPostComponent, {
      width: "30%",
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllCompany();
      }
    });
  }
  deleteCompany(id: number) {
    if (confirm("Are You Sure?")) {
      this.companyService.deleteCompany(id).subscribe({
        next: (_res) => {
          alert("Company deleted successfully");
          this.getAllCompany();
        },
        error: () => {
          alert("Error while deleting Company");
        }
      })
    }
  }
  openCompany() {
    this.dialog.open(CompanyPostComponent, {
      width: "50%",
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllCompany();

      }
    });
  }

  // exportexcel(): void 
  // {
  //    /* table id is passed over here */   
  //    let element = document.getElementById('excel-table'); 
  //    const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(this.data.items);

  //    /* generate workbook and add the worksheet */
  //    const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //    /* save to file */
  //    XLSX.writeFile(wb, this.fileName);

  // }
  
  exportExcel() {
    this.excelService.exportAsExcelFile('Company-List', '', this.displayedColumns, this.data.items, 'company-List', 'Sheet1');
  }

  public openPDF(): void {
    var DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('CompanyPDF.pdf');
    });
  }

 

}


