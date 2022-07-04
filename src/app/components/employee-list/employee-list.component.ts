import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/company.service';
import { ExcelService } from 'src/app/excel-service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  displayedColumns: string[] = ['companyName', 'employeeCode', 'employeeFirstName', 'employeeLastName', 'employeeEmail',
    'employeeMobileNumber', 'employeePortalUserName', 'employeeStatus', 'employeeTeam',
    'address1', 'address2', 'city',
    'state', 'pinCode','country',  'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('htmlData') htmlData!: ElementRef;
  data: any;
  Company:any;

  constructor(private employeeService: EmployeeService, 
    private dialog: MatDialog,private companyService: CompanyService,private excelService:ExcelService) { }

  ngOnInit(): void {

    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getEmployee().subscribe({
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
 

  editEmployee(row: any) {
    this.dialog.open(DialogComponent, {
      width: "30%",
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllEmployees();
      }
    });
  }

  deleteEmployee(id: number) {
    if (confirm("Are You Sure?")) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: (res) => {
          alert("Employee deleted successfully");
          this.getAllEmployees();
        },
        error: () => {
          alert("Error while deleting employee");
        }
      })
    }
  }
  openEmployee() {
    this.dialog.open(DialogComponent, {
      width: "50%",
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getAllEmployees();
      }
    });
  }
  exportExcel() {
    this.excelService.exportAsExcelFile('Employee-List', '', this.displayedColumns, this.data.items,  'employee-List', 'Sheet1');
  }
  // makePDF(){
  //   let pdf = new jsPDF('p','pt','a4');
  //   pdf.html(this.data.items,{
  //     callback:(pdf)=>{
  //       pdf.save("employee.pdf")
  //     }
  //   })
  // }
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('EmployeePDF.pdf');
    });
  }
  

}
