import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BuildingService } from 'src/app/services/building.service';
import { BuildingPostComponent } from '../../building-post/building-post/building-post.component';
import { MatDialog } from '@angular/material/dialog';
import { ExcelService } from 'src/app/excel-service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.css']
})
export class BuildingListComponent implements OnInit {


  displayedColumns: string[] = ['complexId','buildingCode', 'buildingName', 'buildingAvailability', 'buildingMainUse', 'buildingTotalGrossArea',
    'buildingTotalNetArea', 'buildingCoveredArea', 'buildingGlazedArea', 'buildingTotalVolume', 'buildingCleanableArea', 'buildingTotalheatedvolume',
    'buildingNumberofFloors', 'buildingNumberofRoom', 'buildingCondition', 'buildingCriticality', 'address', 'city', 'state', 'country', 'pinCode', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('htmlData') htmlData!: ElementRef;
  data: any;



  constructor(private buildingService: BuildingService, private excelService:ExcelService,
     private dialog: MatDialog) { }
  ngOnInit(): void {
    this.getAllBuilding();

  }

  getAllBuilding() {
    this.buildingService.getBuilding().subscribe({
      next: (res) => {
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

  editBuilding(row: any) {
    this.dialog.open(BuildingPostComponent, {
      width: "30%",
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllBuilding();
      }
    });
  }

  deleteBuilding(id: number) {
    if (confirm("Are You Sure?")) {
      this.buildingService.deleteBuilding(id).subscribe({
        next: (res) => {
          alert("Building deleted successfully");
          this.getAllBuilding();
        },
        error: () => {
          alert("Error while deleting Building");
        }
      })
    }
  }
  openBuilding() {
    this.dialog.open(BuildingPostComponent, {
      width: "50%",
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getAllBuilding();
      }
    });
  }
  exportExcel() {
    this.excelService.exportAsExcelFile('Building-List', '', this.displayedColumns, this.data.items,  'building-List', 'Sheet1');
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
      PDF.save('BuildingPDF.pdf');
    });
  }
}


